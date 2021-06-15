export interface CpfInterface {
    number: string;
    blocked?: boolean;
}

export interface CpfRequest {
    id: string;
    sort?: string;
    number: string;
    blocked: boolean;
    createdAt: Date;
}
