import { RouteMiddleware } from "rwsdk/router";

export const setCommonHeaders =
  (): RouteMiddleware =>
  ({ response, rw: { nonce } }) => {
    if (!import.meta.env.VITE_IS_DEV_SERVER) {
      // Forces browsers to always use HTTPS for a specified time period (2 years)
      response.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload",
      );
    }
    // Forces browser to use the declared content-type instead of trying to guess/sniff it
    response.headers.set("X-Content-Type-Options", "nosniff");

    // Stops browsers from sending the referring webpage URL in HTTP headers
    response.headers.set("Referrer-Policy", "no-referrer");

    // Explicitly disables access to specific browser features/APIs
    response.headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );
    // Defines trusted sources for content loading and script execution:
    const baseCsp =
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://kwesforms.com https://scripts.simpleanalyticscdn.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self' https://api.github.com https://kwesforms.com https://kwesforms.com/api/foreign/forms/* https://simpleanalyticscdn.com https://queue.simpleanalyticscdn.com; " +
      "frame-src https://ghbtns.com https://www.youtube.com https://youtube.com https://www.youtube.com/; " +
      "object-src 'none'; " +
      "img-src 'self' data: https: https://queue.simpleanalyticscdn.com;";

      response.headers.set("Content-Security-Policy", baseCsp);
  };
