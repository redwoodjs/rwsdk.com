import stylesUrl from "./styles.css?url";
import { Analytics } from "./components/Analytics";

const GA_ID = import.meta.env.VITE_GA_ID;

export const Document: React.FC<{ children: React.ReactNode; nonce?: string }> = ({
  children
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="RedwoodSDK is a React framework for building webapps. It’s optimized for the Cloudflare Development Platform, which means you can build your webapp with a database, queues, storage, and much more! All in one place, without having to worry about the underlying infrastructure." />
      <meta name="author" content="RedwoodJS  " />
      <meta name="keywords" content="RedwoodSDK, RedwoodJS, React, TypeScript, Prisma, TailwindCSS, RedwoodJS SDK" />
      <meta name="sitemap" content="/sitemap.xml" />
      
      <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
      <meta name="robots" content="index, follow" />  
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="alexa" content="index, follow" />
      <meta name="yandex" content="index, follow" />
      <meta name="sitemap" content="/sitemap.xml" />
      <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://buttons.github.io https://kwesforms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.github.com; frame-src https://tagmanager.google.com; object-src 'none';" />
      <title>RedwoodSDK</title>
      <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
      <script type="module" src="/src/client.tsx"></script>
      <link rel="stylesheet" href={stylesUrl} />
    </head>
    <body>
      <div id="root">
        {children}
        <Analytics />
        <script src="https://kwesforms.com/v2/kf-script.js" defer></script>
      </div>
    </body>
  </html>
);
