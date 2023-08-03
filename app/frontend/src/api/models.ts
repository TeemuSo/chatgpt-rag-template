export const enum Approaches {
    RetrieveThenRead = "rtr",
    ReadRetrieveRead = "rrr",
    ReadDecomposeAsk = "rda"
}

export type ChatTurn = {
    role: string;
    content: string;
    dataPoints?: string[];
};

export type ChatRequest = {
    history: ChatTurn[];
    approach: Approaches;
};
