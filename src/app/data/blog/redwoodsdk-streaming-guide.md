---
title: "How to use React Server Function Streams in RedwoodSDK"
description: "RedwoodSDK introduces a powerful feature: React Server Function Streams. This allows developers to stream partial responses from the server to the client, enabling real-time updates and improved user experiences."
date: "2025-04-22"
author:
  id: "herman"
heroImage: "7a9d155b-1d08-4158-2f45-f42a723fbc00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/8126e54a-237d-4c60-ee27-182ea5b29900/public"
tags: ["redwoodsdk", "cloudflare", "streaming", "guide", "realtime"]
---

# Streaming AI Responses with RedwoodSDK

RedwoodSDK introduces a powerful feature: **React Server Function Streams**. This allows developers to stream partial responses from the server to the client, enabling real-time updates and improved user experiences.

## What Are Server Function Streams?

Server Function Streams enable the server to send data to the client in chunks as it becomes available. This is particularly useful when dealing with long-running processes or external APIs that support streaming, such as AI models.

## Prerequisites and Setup

Before implementing streaming responses, ensure you have:

- The latest RedwoodSDK package is installed
- A Cloudflare account with AI access is enabled
- Configure your `wrangler.json` file with the AI binding:
  ```jsonc
  {
    // ... other configurations
    "ai": {
      "binding": "AI"
    }
  }
  ```

### Project Structure

A typical streaming AI chat implementation in RedwoodSDK follows this structure:

```
src/
  app/
    pages/
      Chat/
        Chat.tsx      # Client-side component
        functions.ts  # Server functions
```

## Implementing a Streaming Chat with RedwoodSDK

Let's walk through creating a simple chat interface that streams AI-generated responses using RedwoodSDK.

### Server-Side: Creating the Stream Function

First, define a server function that initiates a streaming response from an AI model. Note how we are using the binding from `env.AI` to access the Cloudflare AI models:

```ts
// app/pages/Chat/functions.ts

"use server";

export async function sendMessage(prompt: string) {
  console.log("Running AI with Prompt:", prompt);
  const response = await env.AI.run("@cf/meta/llama-4-scout-17b-16e-instruct", {
    prompt,
    stream: true,
  });
  return response as unknown as ReadableStream;
}
```

This function uses Cloudflare's AI service to generate a response based on the provided prompt, returning a `ReadableStream` that emits chunks of data as they are generated.

### Client-Side: Consuming the Stream

On the client, use the `consumeEventStream` function to handle incoming data chunks and update the UI accordingly:

```tsx
// app/pages/Chat/Chat.tsx

"use client";

import { sendMessage } from "./functions";
import { useState } from "react";
import { consumeEventStream } from "@redwoodjs/sdk/client";

export function Chat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setReply("");

    (await sendMessage(message)).pipeTo(
      consumeEventStream({
        onChunk: (event) => {
          setReply((prev) => {
            if (event.data === "[DONE]") {
              setIsLoading(false);
              return prev;
            }
            return (prev += JSON.parse(event.data).response);
          });
        },
      })
    );
  };

  return (
    <div>
      <div>{reply}</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={message.length === 0 || isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
```

In this component, when the form is submitted, it calls the `sendMessage` function and pipes the resulting stream to `consumeEventStream`. Each chunk received is parsed and appended to the `reply` state, updating the UI in real-time.

## Conclusion

RedwoodSDK's Server Function Streams provide a powerful foundation for building real-time applications. This feature can be used for various use cases:

- AI chat interfaces (as demonstrated)
- Live data dashboards
- Real-time collaboration tools
- Progress indicators for long-running operations
- Live search suggestions
- Real-time analytics

The combination of server-side streaming and client-side consumption creates smooth, responsive experiences that can significantly enhance your application's user experience.

### Next Steps

- Explore different [Cloudflare AI models](https://developers.cloudflare.com/workers-ai/models/) available through the `env.AI` binding
- Implement more advanced features like chat history and message threading
- Add error retry mechanisms and timeout handling
- Implement user authentication and rate limiting

For more details and examples, refer to:

- [RedwoodSDK Documentation](https://docs.rwsdk.com/guides/rsc-streams/)
- [Working Example Repository](https://github.com/redwoodjs/example-streaming-ai-chat/tree/main)
- [Cloudflare AI Documentation](https://developers.cloudflare.com/workers-ai/)
