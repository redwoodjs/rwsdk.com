import { initClient } from "@redwoodjs/sdk/client";

initClient();

export function hydrate(html: string) {
    return initClient({
        transport: (context) => {
            context.setRscPayload(Promise.resolve({
                node: html,
                actionResult: null,
            }));
        },
    });
}