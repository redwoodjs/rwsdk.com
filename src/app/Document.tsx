import stylesUrl from "./styles.css?url";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface DocumentProps {
  children: React.ReactNode;
  nonce?: string;
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

// CSP directives organized by type
const cspDirectives = {
  'script-src': "'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com https://buttons.github.io https://kwesforms.com",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
  'font-src': "'self' https://fonts.gstatic.com",
  'connect-src': "'self' https://api.github.com https://kwesforms.com https://kwesforms.com/api/foreign/forms/* https://www.google-analytics.com",
  'frame-src': "https://tagmanager.google.com",
  'object-src': "'none'",
  'img-src': "'self' https://www.google-analytics.com https://www.googletagmanager.com data: https:",
};

const cspContent = Object.entries(cspDirectives)
  .map(([key, value]) => `${key} ${value}`)
  .join('; ');

export const Document: React.FC<DocumentProps> = ({
  children,
  nonce,
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>RedwoodSDK | The JavaScript SDK for Cloudflare Workers</title>
        {/* Icons */}
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="logo" type="image/svg+xml" href="/images/logo--light.svg" />
        <link rel="logo-dark" type="image/svg+xml" href="/images/logo--dark.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="android-chrome-192x192" href="/images/android-chrome.png" />
        <link rel="android-chrome-512x512" href="/images/android-chrome.png" />

        {/* ogTags */}
        <meta property="og:title" content="RedwoodSDK | The JavaScript SDK for Cloudflare Workers" />
        <meta property="og:description" content="RedwoodSDK is the JavaScript SDK for Cloudflare Workers. It provides a complete set of composable tools to handle the request/response lifecycle of webapps." />
        <meta property="og:image" content="https://rwsdk.com/images/og-image.png" />
        <meta property="og:url" content="https://rwsdk.com" />
        <meta property="og:site_name" content="RedwoodSDK" />
        {/* logo */}
        <meta property="og:logo" content="https://rwsdk.com/images/logo--light.svg" />
        {/* type */}
        <meta property="og:type" content="website" />
        {/* locale */}
        <meta property="og:locale" content="en_US" />
        {/* image */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="RedwoodSDK Logo" />
        
        
        
        
        {/* Search Engine */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="sitemap" content="/sitemap.xml" />
        <meta name="description" content="RedwoodSDK is the JavaScript SDK for Cloudflare Workers. It provides a complete set of composable tools to handle the request/response lifecycle of webapps." />
        <meta name="keywords" content="RedwoodSDK, RedwoodJS, React, TypeScript, Prisma, TailwindCSS, RedwoodJS SDK, Cloudflare Development Platform, response lifecycle, webapps" />
        <meta name="author" content="RedwoodJS" />
        
        {/* Security */}
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />
        
        {/* Analytics */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} nonce={nonce} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} nonce={nonce}></script>
        <script dangerouslySetInnerHTML={{ __html: gaScript }} nonce={nonce} />
        
        {/* Styles and Scripts */}
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
};
