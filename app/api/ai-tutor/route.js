import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { AI_SYSTEM_PROMPT, generateLocalSenseiResponse } from '../../../lib/aiTutorEngine';

let cachedServerDb = null;
function getServerDb() {
  if (cachedServerDb) return cachedServerDb;
  try {
    const dbPath = path.join(process.cwd(), 'public', 'kanji_full_database.json');
    if (fs.existsSync(dbPath)) {
      cachedServerDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
  } catch (e) {}
  return cachedServerDb || {};
}

// API Route xử lý cuộc trò chuyện với Gia sư Kenji Sensei (賢治先生)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      message = '',
      history = [],
      context = {},
      userApiKey = '',
      fullDb = null,
    } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Thiếu nội dung câu hỏi' },
        { status: 400 }
      );
    }

    // 1. Xác định API Key của Google Gemini
    const apiKey =
      (userApiKey && userApiKey.trim()) ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      '';

    // 2. Nếu có API Key, thử gọi Google Gemini API
    if (apiKey) {
      try {
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // Chuẩn bị ngữ cảnh cho Gemini
        const contextPrompt = `
[NGỮ CẢNH HỌC TẬP HIỆN TẠI]:
- Chữ Hán đang xem: 「${context.currentChar || 'Chưa chọn'}」
- Cấp độ JLPT hiện tại: ${context.currentLevel || 'N5'}
- Chế độ màn hình: ${context.activeMode || 'study'}
${context.cardInfo ? `- Âm Hán Việt: ${context.cardInfo.hanViet || ''}, Nghĩa: ${context.cardInfo.meaning || ''}` : ''}
`;

        // Chuẩn bị danh sách tin nhắn theo cấu trúc Gemini contents
        const contents = [];

        // Thêm lịch sử hội thoại gần nhất (tối đa 6 lượt)
        if (Array.isArray(history) && history.length > 0) {
          const recentHistory = history.slice(-6);
          recentHistory.forEach((item) => {
            if (item.sender === 'user') {
              contents.push({
                role: 'user',
                parts: [{ text: item.text }],
              });
            } else if (item.sender === 'sensei') {
              contents.push({
                role: 'model',
                parts: [{ text: item.text }],
              });
            }
          });
        }

        // Tin nhắn hiện tại kèm ngữ cảnh
        contents.push({
          role: 'user',
          parts: [{ text: `${contextPrompt}\n\nCâu hỏi của học viên: ${message}` }],
        });

        const geminiPayload = {
          contents: contents,
          systemInstruction: {
            parts: [{ text: AI_SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 900,
            topP: 0.95,
          },
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(geminiPayload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const replyText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

          if (replyText) {
            return NextResponse.json({
              success: true,
              reply: replyText,
              source: 'gemini',
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to Local Sensei engine:', geminiError.message);
      }
    }

    // 2.5. Nếu chưa có API Key riêng, tự động kết nối dịch vụ Cloud Generative AI miễn phí
    try {
      const contextPrompt = `
[NGỮ CẢNH HỌC TẬP HIỆN TẠI]:
- Chữ Hán đang xem: 「${context.currentChar || 'Chưa chọn'}」
- Cấp độ JLPT hiện tại: ${context.currentLevel || 'N5'}
- Chế độ màn hình: ${context.activeMode || 'study'}
${context.cardInfo ? `- Âm Hán Việt: ${context.cardInfo.hanViet || ''}, Nghĩa: ${context.cardInfo.meaning || ''}` : ''}
`;

      const aiMessages = [
        { role: 'system', content: `${AI_SYSTEM_PROMPT}\n\n${contextPrompt}` },
      ];

      if (Array.isArray(history) && history.length > 0) {
        history.slice(-4).forEach((item) => {
          aiMessages.push({
            role: item.sender === 'user' ? 'user' : 'assistant',
            content: item.text,
          });
        });
      }

      aiMessages.push({ role: 'user', content: message });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout

      const cloudRes = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: aiMessages,
          model: 'openai',
          seed: Math.floor(Math.random() * 1000000),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (cloudRes.ok) {
        const text = await cloudRes.text();
        if (text && text.trim().length > 10) {
          return NextResponse.json({
            success: true,
            reply: text.trim(),
            source: 'cloud_generative_ai',
          });
        }
      }
    } catch (cloudErr) {
      console.warn('Cloud Generative AI call timed out or failed, using local engine:', cloudErr.message);
    }

    // 3. Fallback sang Động cơ Tri thức Nội bộ (Local Knowledge Base) siêu tốc
    const activeDb = (fullDb && Object.keys(fullDb).length > 0) ? fullDb : getServerDb();
    const localReply = generateLocalSenseiResponse(message, context, activeDb);

    return NextResponse.json({
      success: true,
      reply: localReply,
      source: apiKey ? 'local_fallback' : 'local_knowledge',
    });
  } catch (error) {
    console.error('Error in AI Tutor API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Lỗi xử lý yêu cầu AI',
      },
      { status: 500 }
    );
  }
}
