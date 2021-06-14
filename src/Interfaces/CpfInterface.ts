export interface CpfInterface {
    number: string;
}

export interface CpfRequest {
    sort?: string;
    number: string;
    createdAt: Date;
}
