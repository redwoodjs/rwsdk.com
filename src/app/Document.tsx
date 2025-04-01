import stylesUrl from "./styles.css?url";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface MetaTags {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogLogo?: string;
}

interface DocumentProps {
  children: React.ReactNode;
  nonce?: string;
  meta?: MetaTags;
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
  meta = {}
}) => {
  const {
    title = 'RedwoodSDK',
    description = 'RedwoodSDK gives you a complete set of composable tools to handle the request/response lifecycle of webapps.At its core, it’s just a Vite plugin that seamlessly enables SSR, React Server Components, React Server Functions, and real-time.',
    ogTitle = title,
    ogDescription = description,
    ogUrl = 'https://rwsdk.com',
    ogImage = 'https://rwsdk.com/images/og-image.png',
    ogLogo = 'https://rwsdk.com/images/logo--light.svg'
  } = meta;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="author" content="RedwoodJS" />
        <meta name="keywords" content="RedwoodSDK, RedwoodJS, React, TypeScript, Prisma, TailwindCSS, RedwoodJS SDK, Cloudflare Development Platform, response lifecycle, webapps" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:logo" content={ogLogo} />

        <meta property="og:site_name" content="RedwoodSDK" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={ogUrl} />
        <meta property="twitter:title" content={ogTitle} />
        <meta property="twitter:description" content={ogDescription} />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:logo" content={ogLogo} />
        {/* Icons */}
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="android-chrome-192x192" href="/images/android-chrome.png" />
        <link rel="android-chrome-512x512" href="/images/android-chrome.png" />
        
        {/* Search Engine */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="sitemap" content="/sitemap.xml" />
        
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
