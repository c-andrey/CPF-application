export abstract class ModelBase {
    _id: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(init?: Partial<ModelBase>) {
        Object.assign(this, init);
    }
}
