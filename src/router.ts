import express from 'express';
import { Request, Response } from 'express';
import { CpfController } from './Controllers/CpfController';

const cpfController = new CpfController();

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('asd');
});

router.put('/api/cpf/:id', cpfController.put);

router.post('/api/cpf', cpfController.post);
router.delete('/api/cpf/:id', cpfController.delete);

router.post('/api/block', (req: Request, res: Response) => {
    try {
        return res.send('cpf bloqueado');
    } catch (error) {
        throw error;
    }
});

router.get('/api/cpf/blacklist', (req: Request, res: Response) => {
    try {
        return res.send('retornar cpfs bloqueados');
    } catch (error) {
        throw error;
    }
});

export { router as cpfRouter };
