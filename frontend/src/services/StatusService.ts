import { StatusInterface } from '../interfaces/StatusInterface';
import service from './ServiceAbstract';

const getStatus = async (): Promise<StatusInterface> => {
    try {
        const { data } = await service.get('/status');
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getStatus };
