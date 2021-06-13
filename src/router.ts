import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/api/cpf', (req: Request, res: Response) => {
    try {
        return res.send('cpf');
    } catch (error) {
        throw error(error);
    }
});

router.post('/api/cpf', (req: Request, res: Response) => {
    try {
        const { number } = req.body;
        return res.send(number);
    } catch (error) {
        throw error;
    }
});
router.delete('/api/cpf/{id}', (req: Request, res: Response) => {
    try {
        return res.send('cpf deletado');
    } catch (error) {
        throw error;
    }
});

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
