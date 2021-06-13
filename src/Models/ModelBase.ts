export abstract class ModelBase {
    _id: string;
    constructor(init?: Partial<ModelBase>) {
        Object.assign(this, init);
    }
}
