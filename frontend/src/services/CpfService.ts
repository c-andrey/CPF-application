import axios from 'axios';
import { CpfInterface, CpfListInterface } from '../interfaces/CpfInterface';

const getCpf = async (cpf?: string): Promise<CpfListInterface[]> => {
    try {
        const { data } = await axios.get('http://localhost:8080/api/cpf', {
            params: { number: cpf },
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const postCpf = async (cpf: CpfInterface): Promise<CpfInterface> => {
    try {
        const { data } = await axios.post('http://localhost:8080/api/cpf', cpf);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getCpf, postCpf };
