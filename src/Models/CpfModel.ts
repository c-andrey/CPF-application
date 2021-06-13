import { model, Document, Schema } from 'mongoose';
import { ModelBase } from './ModelBase';

const cpfSchema = new Schema({
    number: { type: Schema.Types.Number, required: true },
});

export class Cpf extends ModelBase {
    number: number;

    constructor(init?: Partial<Cpf>) {
        super(init);
        Object.assign(this, init);
    }
}

export const CpfModel = model<Document<Cpf>>('Cpf', cpfSchema);
