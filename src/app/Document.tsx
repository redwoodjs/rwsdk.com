import { TurnstileScript } from "@redwoodjs/sdk/turnstile";
import stylesUrl from "./styles.css?url";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
const GA_ID = import.meta.env.VITE_GA_ID;
const GTM_ID = "GTM-FVTZFB44";

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
  "script-src":
    "'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com https://kwesforms.com",
  "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src": "'self' https://fonts.gstatic.com",
  "connect-src":
    "'self' https://api.github.com https://kwesforms.com https://kwesforms.com/api/foreign/forms/* https://www.google-analytics.com",
  "frame-src": "https://tagmanager.google.com https://ghbtns.com",
  "object-src": "'none'",
  "img-src":
    "'self' https://www.google-analytics.com https://www.googletagmanager.com data: https:",
};

const cspContent = Object.entries(cspDirectives)
  .map(([key, value]) => `${key} ${value}`)
  .join("; ");

const canonicalUrl = "https://rwsdk.com";

export const Document: React.FC<{
  children: React.ReactNode;
  nonce?: string;
}> = ({ children, nonce }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>RedwoodSDK is a React framework for Cloudflare</title>{" "}
        <link rel="canonical" href={canonicalUrl} />
        <TurnstileScript />
        {/* Icons */}
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="logo" type="image/svg+xml" href="/images/logo--light.svg" />
        <link
          rel="logo-dark"
          type="image/svg+xml"
          href="/images/logo--dark.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link rel="android-chrome-192x192" href="/images/android-chrome.png" />
        <link rel="android-chrome-512x512" href="/images/android-chrome.png" />
        {/* ogTags */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* logo */}
        <meta
          property="og:logo"
          content="https://rwsdk.com/images/logo--light.svg"
        />
        {/* locale */}
        <meta property="og:locale" content="en_US" />
        {/* image */}
        {/* Search Engine */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="sitemap" content="/sitemap.xml" />
        <meta
          name="description"
          content="RedwoodSDK is a React framework for Cloudflare. It begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features. Its standards-based router, with support for middleware and interruptors, gives you fine-grained control over every request and response. With built-in access to Cloudflare Workers, D1 (Database), R2 (Storage), Queues, AI, and full local emulation via Miniflare, development feels just like production."
        />
        <meta
          name="keywords"
          content="RedwoodSDK, RedwoodJS, React, TypeScript, Prisma, Tailwind CSS, RedwoodJS SDK, Cloudflare Development Platform, response lifecycle, webapps"
        />
        <meta name="author" content="RedwoodJS" />
        {/* Security */}
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />
        {/* Analytics */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} nonce={nonce} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          nonce={nonce}
        ></script>
        <script dangerouslySetInnerHTML={{ __html: gaScript }} nonce={nonce} />
        {/* Styles and Scripts */}
        <link rel="preload" href="/src/client.tsx" as="script" />
        <link rel="stylesheet" href={stylesUrl} />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <div id="root">
          {children}
          {/* <script src="/src/client.tsx"></script> */}
        </div>
      </body>
    </html>
  );
};
