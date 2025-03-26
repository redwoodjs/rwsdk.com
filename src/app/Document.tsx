import stylesUrl from "./styles.css?url";
import { Analytics } from "./components/Analytics";
import { GoogleTagManager } from "./components/GoogleTagManager";

const GA_ID = import.meta.env.VITE_GA_ID;

export const Document: React.FC<{ children: React.ReactNode; nonce?: string }> = ({
  children
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://buttons.github.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.github.com; frame-src https://tagmanager.google.com; object-src 'none';" />
      <title>RedwoodSDK</title>
      <link rel="icon" type="image/svg+xml" href="/images/logo--dark.svg" />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
      <script type="module" src="/src/client.tsx"></script>
      <link rel="stylesheet" href={stylesUrl} />
    </head>
    <body>
      <GoogleTagManager />
      <div id="root">
        {children}
        <Analytics />
      </div>
    </body>
  </html>
);
