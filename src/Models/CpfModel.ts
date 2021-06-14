import { model, Document, Schema } from 'mongoose';
import { CpfInterface } from '../Interfaces/CpfInterface';
import { ModelBase } from './ModelBase';

const cpfSchema = new Schema({
    number: { type: Schema.Types.Number, required: true },
    createdAt: { type: Schema.Types.Date, required: false },
    updatedAt: { type: Schema.Types.Date, required: false },
});

cpfSchema.pre('save', function () {
    this.set({ createdAt: Date.now() });
});

cpfSchema.pre('findByIdAndUpdate', function () {
    this.set('updatedAt', Date.now());
});

export class Cpf extends ModelBase implements CpfInterface {
    number: number;
    constructor(init?: Partial<Cpf>) {
        super(init);
        Object.assign(this, init);
    }
}

export const CpfModel = model<Document<Cpf>>('Cpf', cpfSchema);
