export interface CpfInterface {
    number: string;
}

export interface CpfRequest {
    id: string;
    sort?: string;
    number: string;
    createdAt: Date;
}
