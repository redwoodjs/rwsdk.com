import { TurnstileScript } from "rwsdk/turnstile";
import stylesUrl from "./styles.css?url";

// CSP directives organized by type
const cspDirectives = {
  "script-src":
    "'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://kwesforms.com https://scripts.simpleanalyticscdn.com",
  "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src": "'self' https://fonts.gstatic.com",
  "connect-src":
    "'self' https://api.github.com https://kwesforms.com https://kwesforms.com/api/foreign/forms/* https://simpleanalyticscdn.com https://queue.simpleanalyticscdn.com",
  "frame-src": "https://ghbtns.com https://www.youtube.com https://youtube.com https://www.youtube.com/",
  "object-src": "'none'",
  "img-src":
    "'self' data: https: https://queue.simpleanalyticscdn.com",
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
        <title>RedwoodSDK is a React framework for Cloudflare</title>
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
        {/* Styles and Scripts */}
        <link rel="stylesheet" href={stylesUrl} />
        <link rel="modulepreload" href="/src/client.tsx" />
      </head>
      <body>
        <div id="root">{children}</div>
        <script>import("/src/client.tsx")</script>
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
        <noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerPolicy="no-referrer-when-downgrade" /></noscript>
      </body>
    </html>
  );
};
