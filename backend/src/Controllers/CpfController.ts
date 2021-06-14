import { Request, Response } from 'express';
import { CpfRequestDto, CpfResponseDto } from '../dtos/CpfDto';
import { CpfRequest } from '../Interfaces/CpfInterface';
import { CpfService } from '../Services/CpfService';

export class CpfController {
    private _service: CpfService;
    constructor() {
        this._service = new CpfService();
    }
    get = async (
        req: Request<{}, {}, {}, CpfRequest>,
        res: Response,
    ): Promise<void> => {
        try {
            const { number, createdAt, sort } = req.query;
            const results = await this._service.getAll(
                { number, createdAt },
                sort,
            );
            res.status(200).send(results);
        } catch (error) {
            res.status(404).send(error.message);
            throw error;
        }
    };

    post = async (req: Request, res: Response): Promise<void> => {
        try {
            const { number } = req.body;

            const data = new CpfRequestDto(number);
            const created = await this._service.create(data);

            res.status(201).send(created);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    };

    put = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { number } = req.body;

            const data = new CpfRequestDto(number);
            const updated = await this._service.update(id, data);

            res.status(200).send(updated);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const deleted = await this._service.delete(id);
            res.status(200).send(deleted);
        } catch (error) {
            res.status(400).send(error.message);
            throw error;
        }
    };
}
