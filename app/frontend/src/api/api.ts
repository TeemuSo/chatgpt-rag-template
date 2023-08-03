import { ChatRequest, ChatTurn } from "./models";

export async function chatApi(options: ChatRequest): Promise<ChatTurn> {
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            history: options.history,
            approach: options.approach
        })
    });

    const parsedResponse: ChatTurn = await response.json();
    console.log(parsedResponse);
    if (response.status > 299 || !response.ok) {
        throw Error("Unknown error");
    }

    return parsedResponse;
}
