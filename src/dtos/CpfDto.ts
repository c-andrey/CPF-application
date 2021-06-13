import cpf from 'node-cpf';
export class CpfRequestDto {
    constructor(public _number: string) {
        this.validateCpf();
    }

    get number(): number {
        return parseInt(cpf.unMask(this._number));
    }

    validateCpf() {
        if (!cpf.validate(this._number)) {
            throw new Error('Cpf Inválido');
        } else return true;
    }
}

export class CpfResponseDto {
    public number: string;

    constructor(number: number) {
        this.number = cpf.mask(String(number));
    }
}
