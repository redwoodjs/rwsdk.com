import { TurnstileScript } from "rwsdk/turnstile";
import stylesInline from "./styles.css?inline";
import { requestInfo } from "rwsdk/worker";

// CSP directives organized by type
const cspDirectives = {
  "script-src":
    "'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://kwesforms.com",
  "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src": "'self' https://fonts.gstatic.com",
  "connect-src":
    "'self' https://api.github.com https://kwesforms.com https://kwesforms.com/api/foreign/forms/*",
  "frame-src":
    "https://ghbtns.com https://www.youtube.com https://youtube.com https://www.youtube.com/",
  "object-src": "'none'",
  "img-src": "'self' data: https:",
};

const cspContent = Object.entries(cspDirectives)
  .map(([key, value]) => `${key} ${value}`)
  .join("; ");

const canonicalUrl = "https://rwsdk.com";

export const Document: React.FC<{
  children: React.ReactNode;
  nonce?: string;
}> = ({ children, nonce }) => {
  const theme = requestInfo?.ctx?.theme || "system";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>RedwoodSDK: A simple framework for humans</title>

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
          content="Server-first React, running on the Cloudflare platform. Simple to build. Easy to maintain."
        />
        <meta
          name="keywords"
          content="Server-first React, Cloudflare, framework, React, TypeScript, Cloudflare Workers"
        />
        <meta name="author" content="RedwoodJS" />
        {/* Security */}
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />
        {/* Fonts — loaded async to avoid blocking FCP/LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=optional"
        />
        <link
          rel="stylesheet"
          media="print"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=optional"
          onLoad={(e) => { (e.currentTarget as HTMLLinkElement).media = "all"; }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=optional"
          />
        </noscript>
        {/* Styles and Scripts */}
        <style dangerouslySetInnerHTML={{ __html: stylesInline }} />
        <link rel="modulepreload" href="/src/client.tsx" />
      </head>
      <body className="bg-parchment dark:bg-dark-bg text-charcoal dark:text-dark-primary font-sans transition-colors duration-200">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = ${JSON.stringify(theme)};
                const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldBeDark = theme === 'dark' || (theme === 'system' && isSystemDark);
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
        <div id="root">{children}</div>
        <script>import("/src/client.tsx")</script>

      </body>
    </html>
  );
};
