import { NextResponse } from 'next/server';

// In-memory server cache for KanjiVG SVGs
const serverCache = new Map();

export async function GET(request, { params }) {
  try {
    const { hex } = await params;
    if (!hex || typeof hex !== 'string') {
      return new NextResponse('Invalid hex parameter', { status: 400 });
    }

    const cleanHex = hex.replace('.svg', '').toLowerCase().padStart(5, '0');

    // 1. Check in-memory server cache
    if (serverCache.has(cleanHex)) {
      return new NextResponse(serverCache.get(cleanHex), {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // 2. Fetch from CDNs with fallback
    const urls = [
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${cleanHex}.svg`,
      `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${cleanHex}.svg`,
      `https://cdn.statically.io/gh/KanjiVG/kanjivg/master/kanji/${cleanHex}.svg`,
      `https://fastly.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${cleanHex}.svg`,
    ];

    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
          next: { revalidate: 86400 * 30 }, // Next.js cache 30 days
        });

        if (res.ok) {
          const svgText = await res.text();
          if (svgText && svgText.includes('<svg') && svgText.includes('<path')) {
            serverCache.set(cleanHex, svgText);
            return new NextResponse(svgText, {
              status: 200,
              headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=31536000, immutable',
              },
            });
          }
        }
      } catch (err) {
        // Try next fallback URL
        continue;
      }
    }

    return new NextResponse('KanjiVG SVG not found', { status: 404 });
  } catch (error) {
    return new NextResponse(`Server error: ${error.message}`, { status: 500 });
  }
}
