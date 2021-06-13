import { Document, Model } from 'mongoose';
import { Cpf } from '../Models/CpfModel';
import { RepositoryBase } from './RepositoryBase';

export class CpfsRepository extends RepositoryBase<Cpf> {
    constructor(_mongooseModel: Model<Document<Cpf>>) {
        super(_mongooseModel);
    }
}
