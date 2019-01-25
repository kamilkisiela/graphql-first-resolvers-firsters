export interface User {
    id: string;
    name: string;
}
export interface Message {
    id: string;
    createdAt: Date;
    text: string;
    sender: string;
    recipient: string;
}
export interface Chat {
    id: string;
    members: string[];
    messages: Message[];
}
export declare function findUserById(id: string): {
    id: string;
    name: string;
} | undefined;
export declare function findUsers(): {
    id: string;
    name: string;
}[];
export declare function findChatById(id: string): {
    id: string;
    members: string[];
    messages: {
        id: string;
        createdAt: Date;
        text: string;
        sender: string;
        recipient: string;
    }[];
} | undefined;
export declare function findChats(): {
    id: string;
    members: string[];
    messages: {
        id: string;
        createdAt: Date;
        text: string;
        sender: string;
        recipient: string;
    }[];
}[];
export declare function addMessageToChat({ chatId, text, senderId, recipientId, }: {
    chatId: string;
    text: string;
    senderId: string;
    recipientId: string;
}): {
    id: string;
    createdAt: Date;
    text: string;
    sender: string;
    recipient: string;
};
