import './globals.css';

export const metadata = {
  title: 'Học Kanji Nhật Bản | 漢字学習帳 (Kanji Gakushūchō)',
  description:
    'Ứng dụng học chữ Hán Kanji phong cách Nhật Bản truyền thống (Torii Red & Washi), bao gồm Flashcard chi tiết nghĩa tiếng Việt, Mẹo nhớ chiết tự bộ thủ, trắc nghiệm Quiz 4 đáp án và Sổ tay ôn tập thông minh.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kanji Nhật',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/images/logo_emblem.png?v=2', type: 'image/png' },
      { url: '/icons/icon-192.png?v=2', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico?v=2'],
  },
};

export const viewport = {
  themeColor: '#b91c1c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Shippori+Mincho:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kanji Nhật" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
      </head>
      <body className="antialiased select-text">
        {children}
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration error:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
