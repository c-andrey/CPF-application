import express from 'express';
import { CpfController } from './Controllers/CpfController';
import { StatusController } from './Controllers/StatusController';
const cpfController = new CpfController();
const statusController = new StatusController();

const router = express.Router();

router.get('/api/cpf', cpfController.get);
router.get('/api/cpf/:id', cpfController.get);
router.put('/api/cpf/:id', cpfController.put);
router.post('/api/cpf', cpfController.post);
router.delete('/api/cpf/:id', cpfController.delete);

router.get('/api/status', statusController.get);
export default router;
