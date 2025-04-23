export interface Contact {
    id: string;
    userId: string;
    name: string;
    address: string;
    notes?: string;
    networks: string[];
    metadata?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}