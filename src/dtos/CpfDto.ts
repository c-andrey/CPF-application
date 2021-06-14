import cpf from 'node-cpf';
import { Cpf } from '../Models/CpfModel';
import { BaseRequestDto } from './BaseDto';
export class CpfRequestDto extends BaseRequestDto<Cpf> {
    constructor(public _number: string) {
        super();
        this.validateCpf();
        this.sanitirizeCpf();
    }

    get number(): number {
        return parseInt(cpf.unMask(this._number));
    }

    validateCpf() {
        if (!cpf.validate(this._number)) {
            throw new Error('Cpf Inválido');
        } else return true;
    }

    sanitirizeCpf() {
        if (this._number.search('.') !== -1) {
            this._number = cpf.unMask(this._number);
        }
    }

    getInstance() {
        return {
            number: this.number,
        };
    }
}

export class CpfResponseDto {
    public number: string;
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(init: Partial<Cpf>) {
        this.id = init._id;
        this.createdAt = init.createdAt;
        this.updatedAt = init.updatedAt;
        this.number = cpf.mask(String(init.number));
    }
}
