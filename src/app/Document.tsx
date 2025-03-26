import stylesUrl from "./styles.css?url";

const GA_ID = import.meta.env.VITE_GA_ID;

export const Document: React.FC<{ children: React.ReactNode; nonce?: string }> = ({
  children,
  nonce,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Security-Policy" content="style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;" />
      <title>RedwoodSDK</title>
      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} nonce={nonce}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');

            // Track GitHub star button clicks
            document.addEventListener('click', function(e) {
              const target = e.target.closest('[data-track="true"]');
              if (target) {
                gtag('event', 'star_click', {
                  event_category: 'engagement',
                  event_label: 'GitHub Star Button'
                });
              }
            });
          `,
        }}
        nonce={nonce}
      />
      <script type="module" src="/src/client.tsx"></script>
      <link rel="stylesheet" href={stylesUrl} />
    </head>
    <body>
      <div id="root">{children}</div>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </body>
  </html>
);
