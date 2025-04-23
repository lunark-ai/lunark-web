export interface ITransaction {
    id: string;
    hash: string;
    status: string;
    type: string;
    data: any;
    userId: string;
    messageId: string;
    user?: {
        id: string;
        address: string;
    };
    message?: {
        id: string;
        content: string;
    };
    createdAt: Date;
    updatedAt: Date;
}