import { modelNames } from 'mongoose';
import { CpfRequestDto, CpfResponseDto } from '../dtos/CpfDto';
import { Cpf, CpfModel } from '../Models/CpfModel';
import { CpfsRepository } from '../Repositories/CpfsRepository';
import { RepositoryBase } from '../Repositories/RepositoryBase';
import { ServiceBase } from './ServiceBase';

export class CpfService extends ServiceBase<
    CpfResponseDto,
    CpfRequestDto,
    Cpf
> {
    protected repo: CpfsRepository;
    constructor() {
        super();
        this.repo = new CpfsRepository(CpfModel);
    }
    public async getAll(number?: number): Promise<CpfResponseDto[]> {
        const data = await this.repo.getAll({ number }, { number });
        const result = data.map(item => this.modelToDto(item));
        return result;
    }

    public async findById(id: string): Promise<CpfResponseDto> {
        const data = await this.repo.findById(id);
        if (data) {
            return this.modelToDto(data);
        }

        return null;
    }

    create = async (dto: CpfRequestDto): Promise<CpfResponseDto> => {
        let model = this.dtoToModel(dto);
        model = await this.repo.create(model);
        const result = this.modelToDto(model);
        return result;
    };

    update = async (
        id: string,
        dto: CpfRequestDto,
    ): Promise<CpfResponseDto> => {
        const exist = await this.repo.exists({ _id: id });
        if (!exist) {
            return null;
        }

        let model = this.dtoToModel(dto);
        model = await this.repo.update(id, model);
        return this.modelToDto(model);
    };

    delete = async (id: string): Promise<boolean> => {
        const exist = await this.repo.exists({ _id: id });
        if (!exist) {
            return null;
        }

        return this.repo.delete(id);
    };

    protected modelToDto(model: Cpf): CpfResponseDto {
        return new CpfResponseDto(model);
    }

    protected dtoToModel(dto: CpfRequestDto): Cpf {
        return new Cpf(dto.getInstance());
    }
}
