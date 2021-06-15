import serverStatus from '../config/ServerStatus';
import { Request, Response } from 'express';

export class StatusController {
    get = async (req: Request, res: Response): Promise<void> => {
        try {
            const status = await serverStatus();

            res.status(200).send(status);
        } catch (error) {
            res.status(404).send(error.message);
        }
    };
}
