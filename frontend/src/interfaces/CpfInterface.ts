export interface CpfInterface {
    id?: string;
    blocked: boolean;
    number: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CpfListInterface {
    id: string;
    blocked: boolean;
    number: string;
    createdAt?: Date;
    updatedAt?: Date;
}
