---
title: "Full-Stack: RedwoodSDK and Paystack Payment Integration"
description: "How RedwoodSDK simplifies integrating a payment gateway such as Paystack into your application."
date: "2025-05-08"
author: 
  id: "herman"
heroImage: "5e072198-1834-45c3-0c73-9e91c0854700"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/6ac44b33-2e30-416d-703a-dd570d738d00/public"
tags: ["redwoodsdk", "fullstack", "server components"]
---

# Full-Stack: RedwoodSDK and Paystack Payment Integration

_Ever done a payment gateway integration? There’s a lot of back and forth between server and client. You could almost call it a **back-and-forth-end**!_

In this very basic guide, I’ll walk through how you might do it using **RedwoodSDK** and [**Paystack**](https://paystack.com/).

---

## Traditional Payment Flow

Integrating with a payment gateway the traditional way usually involves:

1. A separate backend server to securely handle API keys and secrets.
2. The frontend (client) sends basic data — usually an amount and a payment method.
3. The server makes the actual payment request and saves the status.
4. The client checks back for the result and shows a success or failure message.

This setup creates a disjointed workflow, requiring extra boilerplate just to bridge the frontend and backend.

---

## A Simpler Approach with RedwoodSDK

With **RedwoodSDK**, a full-stack framework, this complexity is significantly reduced:

- There’s **no need for a separate server** project — backend and frontend live together.
- Server-side logic can be co-located and called directly from the client.
- Security-sensitive operations stay secure, while the client remains simple.

Everything is handled in one unified project. You get the same separation of concerns, but without the logistical pain of separate deployments and services.

---

## Example: Basic Payment Flow with RedwoodSDK

Here’s a minimal example of what this might look like in a RedwoodSDK setup.

First, we create a [React server component](https://docs.rwsdk.com/core/react-server-components/):

```ts
// payment.ts
"use server";

import { db } from "@/db";
import { AppContext } from "@/worker";
import { env } from "cloudflare:workers";

const INITIATE_PAYMENT_LINK = "https://api.paystack.co/transaction/initialize";
const VERIFY_PAYMENT_LINK = "https://api.paystack.co/transaction/verify/";
const CALLBACK_URL = "http://localhost:5173/subscribe/callback"; // Testing locally

export async function initiatePayment(email: string, plan: string) {
  const response = await fetch(INITIATE_PAYMENT_LINK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
    },
    body: JSON.stringify({ email, plan, callback_url: CALLBACK_URL }),
  });

  const data = await response.json();
  return data;
}

export async function verifyPayment(reference: string) {
  const response = await fetch(`${VERIFY_PAYMENT_LINK}${reference}`, {
    headers: {
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
    },
  });

  const data = await response.json();
  return data;
}
```

> _Note how we do [DB queries](https://docs.rwsdk.com/core/database/), access [ENV vars](https://docs.rwsdk.com/core/env-vars/), and call secure APIs — all within RedwoodSDK._

---

Now let’s see what the **client** is doing:

```tsx
"use client";

import { initiatePayment } from "@/app/actions/payment";
import { packages } from "@/app/Constants";
import { useState } from "react";

export default function Subscribe() {
  const [selectedPackage, setSelectedPackage] = useState("Starter");
  const [email, setEmail] = useState("");
  const pkg = packages.find((pkg) => pkg.title === selectedPackage);

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;

    const response = await initiatePayment(email, pkg.planCode);
    if (response.status) {
      window.location.href = response.data.authorization_url;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit">Subscribe to {selectedPackage} Package</button>
    </form>
  );
}
```

---

## Handling the Callback Route

Let’s register the callback URL in our app:

```ts
// worker.tsx

export default defineApp([
  setCommonHeaders(),
  async ({ ctx }) => {
    await setupDb(env);
    setupSessionStore(env);

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: { id: ctx.session.userId },
      });
    }
  },
  render(Document, [
    route("/", [HomePage]),
    prefix("/subscribe", subscribeRoutes),
  ]),
]);
```

And now the route definitions:

```ts
// subscribeRoutes.ts

import { route, index } from "rwsdk/router";
import { verifyPayment } from "@/app/actions/payment";
import Subscribe from "./Subscribe";
import PaymentSuccess from "./PaymentSuccess";
import PaymentError from "./PaymentError";

const subscribeRoutes = [
  index(Subscribe),
  route("/callback", async (ctx, request) => {
    const url = new URL(request.url);
    const reference = url.searchParams.get("reference") || "";

    const payment = await verifyPayment(reference);

    if (payment.data.status === "success") {
      const user = await db.user.findUnique({
        where: { id: ctx.user?.id },
      });

      if (user) {
        const subscription = await db.subscription.findUnique({
          where: { userId: user.id },
        });
        // Additional logic...
      }

      return Response.redirect(
        new URL("/subscribe/payment-success", request.url)
      );
    }

    return Response.redirect(new URL("/subscribe/payment-failed", request.url));
  }),

  route("/payment-success", PaymentSuccess),
  route("/payment-failed", PaymentError),
];

export default subscribeRoutes;
```

_Note how were are simply sending a valid Response, be it React or a Redirect. This could be done in many ways, but it shows how we think about Request/Response, how you could interrupt and return something else instead based on the outcome of a normal function, DB call and so on._

---

## Final Thoughts

You get the **full power of the request/response cycle** with [RedwoodSDK's routing](https://docs.rwsdk.com/core/routing/), while keeping everything in one cohesive codebase.

Payment integration doesn’t have to be a mess of microservices. RedwoodSDK helps you build secure, full-stack features like this with minimal boilerplate.

---

Happy building!
