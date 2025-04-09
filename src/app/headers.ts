import { RouteMiddleware } from "@redwoodjs/sdk/router";
import { IS_DEV } from "@redwoodjs/sdk/constants";

export const setCommonHeaders =
  (): RouteMiddleware =>
  ({ headers, rw: { nonce }, request }) => {
    if (!IS_DEV) {
      // Forces browsers to always use HTTPS for a specified time period (2 years)
      headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload",
      );
    }

    // Set cache control for images
    const url = new URL(request.url);
    if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
      headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable" // Cache for 1 year
      );
    }

    // Performance headers
    headers.set("X-DNS-Prefetch-Control", "on");
    headers.set("X-XSS-Protection", "1; mode=block");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    
    // Preload critical resources
    headers.set(
      "Link",
      '</images/logo--light.svg>; rel=preload; as=image, </images/favicon.svg>; rel=preload; as=image'
    );

    // Forces browser to use the declared content-type instead of trying to guess/sniff it
    headers.set("X-Content-Type-Options", "nosniff");

    // Defines trusted sources for content loading and script execution:
    headers.set(
      "Content-Security-Policy",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com https://buttons.github.io https://kwesforms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.github.com https://kwesforms.com https://kwesforms.com/api/foreign/forms/* https://www.google-analytics.com; frame-src https://tagmanager.google.com; object-src 'none';",
    );
  };
