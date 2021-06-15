import { model, Document, Schema } from 'mongoose';
import { CpfInterface } from '../Interfaces/CpfInterface';
import { ModelBase } from './ModelBase';
import mongoosePaginate from 'mongoose-paginate-v2';

const cpfSchema = new Schema({
    number: { type: Schema.Types.String, required: true },
    blocked: { type: Schema.Types.Boolean, required: true },
    createdAt: { type: Schema.Types.Date, required: false },
    updatedAt: { type: Schema.Types.Date, required: false },
});

cpfSchema.plugin(mongoosePaginate);

cpfSchema.pre('save', function () {
    this.set({ createdAt: Date.now() });
});

cpfSchema.pre('findOneAndUpdate', function () {
    this.set('updatedAt', Date.now());
});

export class Cpf extends ModelBase implements CpfInterface {
    number: string;
    blocked?: boolean = false;
    constructor(init?: Partial<Cpf>) {
        super(init);
        Object.assign(this, init);
    }
}

export const CpfModel = model<Document<Cpf>>('Cpf', cpfSchema);
