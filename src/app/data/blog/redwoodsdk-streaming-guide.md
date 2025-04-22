
# Streaming AI Responses with RedwoodSDK

RedwoodSDK introduces a powerful feature: **React Server Function Streams**. This allows developers to stream partial responses from the server to the client, enabling real-time updates and improved user experiences.

## What Are Server Function Streams?

Server Function Streams enable the server to send data to the client in chunks as it becomes available. This is particularly useful when dealing with long-running processes or external APIs that support streaming, such as AI models.

## Implementing a Streaming Chat with RedwoodSDK

Let's walk through creating a simple chat interface that streams AI-generated responses using RedwoodSDK.

### Server-Side: Creating the Stream Function

First, define a server function that initiates a streaming response from an AI model:

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

RedwoodSDK's Server Function Streams provide a seamless way to integrate streaming data into your applications, enhancing interactivity and responsiveness. Whether you're building chat interfaces, live feeds, or real-time dashboards, this feature can significantly improve the user experience.

For more details and examples, refer to the official RedwoodSDK documentation: [React Server Function Streams](https://docs.rwsdk.com/guides/rsc-streams/)
