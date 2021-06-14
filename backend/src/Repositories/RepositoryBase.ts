import { Document, Model } from 'mongoose';
import { ModelBase } from '../Models/ModelBase';

export abstract class RepositoryBase<TModel extends ModelBase> {
    constructor(private _mongooseModel: Model<Document<TModel>>) {}

    public async findById(id: string): Promise<TModel> {
        const item = await this._mongooseModel.findById(id).exec();
        if (item == null) {
            return null;
        }
        return item.toObject<TModel>();
    }

    public async findOne(conditions: Partial<TModel>): Promise<TModel> {
        const item = await this._mongooseModel
            .findOne(conditions as any)
            .exec();
        if (item == null) {
            return null;
        }
        return item.toObject<TModel>();
    }

    public exists(conditions: Partial<TModel>): Promise<boolean> {
        return this._mongooseModel.exists(conditions as any);
    }

    getAll = async (
        conditions?: Partial<TModel>,
        sort?: Partial<TModel>,
    ): Promise<TModel[]> => {
        const query = this._mongooseModel.find(conditions as any);
        if (sort) {
            query.sort(sort);
        }
        const items = await query.exec();
        if (items == null || !items.length) {
            return [];
        }
        return items.map(item => item.toObject<TModel>());
    };

    create = async (data: TModel): Promise<TModel> => {
        const entity = new this._mongooseModel(data);
        const saved = await entity.save();
        return await this.findById(saved.id);
    };

    update = async (id: string, data: TModel): Promise<TModel> => {
        const saved = await this._mongooseModel
            .findByIdAndUpdate(id, data as any)
            .exec();
        if (!saved) {
            return null;
        }
        return this.findById(saved.id);
    };

    public async delete(id: string): Promise<boolean> {
        const deleted = await this._mongooseModel.findByIdAndDelete(id).exec();
        return !!deleted;
    }
}
