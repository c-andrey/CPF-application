import { Request, Response } from 'express';
import { CpfRequestDto, CpfResponseDto } from '../dtos/CpfDto';
import { CpfService } from '../Services/CpfService';
import { bodyValidator, controller, get, post } from './decorators';

@controller('/api')
class CpfController {
    private _service: CpfService;

    constructor() {
        this._service = new CpfService();
    }
    @get('/cpf/:id')
    getCpf(req: Request, res: Response): void {
        const { id } = req.params;
        res.send(id);
    }

    @post('/cpf')
    @bodyValidator('number')
    postCpf(req: Request, res: Response): void {
        try {
            const { number } = req.body;

            const data = new CpfRequestDto(number);
            const created = this._service.create(data);

            res.status(201).send(created);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}
