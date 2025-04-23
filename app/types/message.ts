import { IMemory } from "./memory";
import { ITransaction } from "./transaction";

export interface IMessage {
    id: string;
    content: string;
    toolData?: string | null;
    role: string;
    chatId: string;
    userId: string;
    chat?: {
        id: string;
        title: string;
        userId: string;
    };
    user?: {
        id: string;
        address: string;
    };
    transaction?: ITransaction | null;
    memories?: IMemory[];
    createdAt: Date;
    updatedAt: Date;
}