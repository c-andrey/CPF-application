/* eslint-disable no-console */
import axios from 'axios';
import { CpfInterface, CpfListInterface } from '../interfaces/CpfInterface';

const getCpf = async (
    cpf?: CpfInterface,
): Promise<CpfListInterface[] | CpfInterface> => {
    try {
        let params = {};
        if (cpf) {
            params = {
                number: cpf.number,
                id: cpf.id,
            };
        }
        const { data } = await axios.get('http://localhost:8080/api/cpf', {
            params,
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

const putCpf = async (cpf: CpfListInterface): Promise<CpfListInterface> => {
    try {
        const { data } = await axios.put(
            `http://localhost:8080/api/cpf/${cpf.id}`,
            cpf,
        );

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteCpf = async (id: string): Promise<boolean> => {
    try {
        const { data } = await axios.delete(
            `http://localhost:8080/api/cpf/${id}`,
        );
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getCpf, postCpf, putCpf, deleteCpf };
