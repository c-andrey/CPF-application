import { CpfRequestDto, CpfResponseDto } from '../dtos/CpfDto';
import { Cpf } from '../Models/CpfModel';
import { CpfsRepository } from '../Repositories/CpfsRepository';
import { ServiceBase } from './ServiceBase';

export class CpfService extends ServiceBase<
    CpfResponseDto,
    CpfRequestDto,
    Cpf
> {
    protected repo: CpfsRepository;
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

    public async create(dto: CpfRequestDto): Promise<CpfResponseDto> {
        let model = this.dtoToModel(dto);
        model = await this.repo.create(model);
        const result = this.modelToDto(model);
        return result;
    }

    public async update(
        id: string,
        dto: CpfRequestDto,
    ): Promise<CpfResponseDto> {
        const exist = await this.repo.exists({ _id: id });
        if (!exist) {
            return null;
        }

        let model = this.dtoToModel(dto);
        model = await this.repo.update(id, model);
        return this.modelToDto(model);
    }

    public async delete(id: string): Promise<boolean> {
        const exist = await this.repo.exists({ _id: id });
        if (!exist) {
            return null;
        }

        return this.repo.delete(id);
    }

    protected modelToDto(model: Cpf): CpfResponseDto {
        return new CpfResponseDto(model.number);
    }

    protected dtoToModel(dto: CpfRequestDto): Cpf {
        return new Cpf({ number: dto.number });
    }
}
