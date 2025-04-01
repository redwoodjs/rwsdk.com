import stylesUrl from "./styles.css?url";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID;
const GTM_ID = 'GTM-FVTZFB44';

const gaScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
`;

const gtmScript = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_ID}');
`;

export const Document: React.FC<{ children: React.ReactNode; nonce?: string }> = ({
  children,
  nonce
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="RedwoodSDK is a React framework for building webapps. It's optimized for the Cloudflare Development Platform, which means you can build your webapp with a database, queues, storage, and much more! All in one place, without having to worry about the underlying infrastructure." />
      <meta name="author" content="RedwoodJS  " />
      <meta name="keywords" content="RedwoodSDK, RedwoodJS, React, TypeScript, Prisma, TailwindCSS, RedwoodJS SDK" />
      <meta name="sitemap" content="/sitemap.xml" />

      <script dangerouslySetInnerHTML={{ __html: gtmScript }} nonce={nonce} />

      <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="alexa" content="index, follow" />
      <meta name="yandex" content="index, follow" />
      <meta name="sitemap" content="/sitemap.xml" />
      <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com https://buttons.github.io https://kwesforms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.github.com https://kwesforms.com https://kwesforms.com/api/foreign/forms/* https://www.google-analytics.com; frame-src https://tagmanager.google.com; object-src 'none';" />
      <title>RedwoodSDK</title>
      <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} nonce={nonce}></script>
      <script dangerouslySetInnerHTML={{ __html: gaScript }} nonce={nonce} />
      <script type="module" src="/src/client.tsx" nonce={nonce}></script>
      <link rel="stylesheet" href={stylesUrl} />
    </head>
    <body>
      <noscript>
        <iframe 
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
      <div id="root">
        {children}
      </div>
    </body>
  </html>
);
