import { CpfRequestDto, CpfResponseDto } from '../dtos/CpfDto';
import { Cpf, CpfModel } from '../Models/CpfModel';
import { CpfsRepository } from '../Repositories/CpfsRepository';
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
    getAll = async (
        cpf: Partial<Cpf>,
        sort: string,
    ): Promise<CpfResponseDto[]> => {
        let query = {};
        if (cpf._id) {
            query = {
                ...query,
                _id: cpf._id,
            };
        }
        if (cpf.number) {
            query = {
                ...query,
                number: cpf.number,
            };
        }

        const data = await this.repo.getAll(query, { number: sort || 'asc' });
        const result = data.map(item => this.modelToDto(item));
        return result;
    };

    findById = async (id: string): Promise<CpfResponseDto> => {
        const data = await this.repo.findById(id);
        if (data) {
            return this.modelToDto(data);
        }

        return null;
    };

    create = async (dto: CpfRequestDto): Promise<CpfResponseDto> => {
        let model = this.dtoToModel(dto);

        if (await this.verifyDuplicate(model.number)) {
            console.log('asd');
            throw new Error('Cpf já cadastrado.');
        }

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
            throw new Error('Registro não existe.');
        }

        let model = this.dtoToModel(dto);

        if (await this.verifyDuplicate(model.number)) {
            console.log('asd');
            throw new Error('Cpf já cadastrado.');
        }

        model = await this.repo.update(id, model);
        return this.modelToDto(model);
    };

    delete = async (id: string): Promise<boolean> => {
        const exist = await this.repo.exists({ _id: id });
        if (!exist) {
            throw new Error('Registro não existe.');
        }

        return this.repo.delete(id);
    };

    verifyDuplicate = async (number: string): Promise<boolean> => {
        const exist = await this.repo.exists({ number });
        return exist;
    };

    protected modelToDto(model: Cpf): CpfResponseDto {
        return new CpfResponseDto(model);
    }

    protected dtoToModel(dto: CpfRequestDto): Cpf {
        return new Cpf(dto.getInstance());
    }
}
