---
title: "Managing Production and Staging Environments with RedwoodSDK and Cloudflare"
description: "Learn how to easily manage production and staging environments for your RedwoodSDK application using Cloudflare's environment variables and deployment commands."
date: "2025-04-10"
author:
  id: "herman"
heroImage: "077a4d25-89e1-46f4-6f62-71d8ee160500"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/a90bdff6-ef21-4dbf-93da-6c86e6844e00/public"
tags: ["redwoodsdk", "cloudflare", "deployment", "environments"]
---

# Managing Production and Staging Environments with RedwoodSDK and Cloudflare

When building applications with RedwoodSDK, you'll often need to maintain separate environments for development, staging, and production. Cloudflare makes this process incredibly simple with their environment-based configuration system. In this guide, we'll walk through how to set up and manage different environments for your RedwoodSDK application.

## Environment Configuration in Wrangler

The key to managing different environments lies in your `wrangler.jsonc` configuration file. Here's how you can set up staging and production environments:

```jsonc
{
  "env": {
    "staging": {
      "vars": {
        "APP_NAME": "redwoodsdk-staging"
      }
    },
    "production": {
      "vars": {
        "APP_NAME": "redwoodsdk-production"
      },
      "routes": [
        {
          "pattern": "rwsdk.com",
          "custom_domain": true
        },
        {
          "pattern": "www.rwsdk.com",
          "custom_domain": true
        }
      ]
    }
  }
}
```

This configuration:
- Sets up a staging environment with a specific app name
- Configures the production environment with custom domains
- Uses environment-specific variables to differentiate between environments

## Deployment Commands

Deploying to different environments is as simple as setting an environment variable before running the release command:

### Deploying to Production
```bash
pnpm release
```

### Deploying to Staging
```bash
CLOUDFLARE_ENV=staging pnpm release
```

That's it! The same command works for both environments, with the environment variable determining where your application gets deployed.

## Accessing Your Environments

If you haven't set up custom domains:
- Cloudflare will automatically provide you with URLs for both environments
- The staging URL will be different from your production URL
- You can find these URLs in your Cloudflare dashboard after deployment
- **Pro Tip**: Cloudflare will show you the deployment URL in your terminal as soon as the deployment is complete, making it easy to access your application immediately

## Best Practices

1. **Environment Variables**: Use different environment variables for each environment to manage configuration differences
2. **Database Connections**: Consider using separate databases for staging and production
3. **Testing**: Always test new features in staging before deploying to production
4. **Monitoring**: Set up separate monitoring for each environment

## Conclusion

Managing multiple environments with RedwoodSDK and Cloudflare is straightforward and requires minimal configuration. The environment-based deployment system makes it easy to maintain separate instances of your application while keeping the deployment process simple and consistent.

Remember:
- Use `pnpm release` for production
- Use `CLOUDFLARE_ENV=staging pnpm release` for staging
- Configure your `wrangler.jsonc` with environment-specific settings
- Take advantage of Cloudflare's automatic URL generation if you don't have custom domains
- Watch your terminal for the deployment URL after each release

Happy deploying! 🚀

