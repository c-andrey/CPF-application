import { ModelBase } from '../Models/ModelBase';
import { RepositoryBase } from '../Repositories/RepositoryBase';

export abstract class ServiceBase<
    ResponseDto,
    RequestDto,
    TModel extends ModelBase,
> {
    protected abstract modelToDto(model: TModel): ResponseDto;
    protected abstract dtoToModel(dto: RequestDto): TModel;

    protected abstract readonly repo: RepositoryBase<TModel>;
}
