export interface IMemory {
    id: string;
    content: string;
    type: string;
    userId: string;
    chatId?: string | null;
    importance: number;
    timestamp: Date;
    metadata?: string | null;
    user?: {
        id: string;
        address: string;
    };
    chat?: {
        id: string;
        title: string;
    } | null;
    messages?: {
        id: string;
        content: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}