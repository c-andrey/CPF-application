import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CpfListInterface } from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const Cpf = (props: RouteComponentProps<{ id: string }>): JSX.Element => {
    const initialCpfState = {
        id: '',
        number: '',
    };

    const [currentCpf, setCurrentCpf] =
        useState<CpfListInterface>(initialCpfState);
    const [message, setMessage] = useState('');

    const getCpf = async (id: string): Promise<void> => {
        const cpf = await actions.getCpf({ id, number: '' });
        setCurrentCpf(cpf[0] as CpfListInterface);
    };

    useEffect(() => {
        if (props.match.params.id) {
            getCpf(props.match.params.id);
        } else {
            setMessage('CPF não encontrado.');
        }
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setCurrentCpf({ ...currentCpf, [name]: value });
    };

    const updateCpf = async (): Promise<void> => {
        const cpf = {
            id: currentCpf.id,
            number: currentCpf.number,
        };

        const updated = await actions.putCpf(cpf);
        setCurrentCpf(updated);
        setMessage('CPF atualizado com sucesso.');
    };

    const deleteCpf = async (): Promise<void> => {
        const deleted = await actions.deleteCpf(currentCpf.id);
        if (deleted) {
            setMessage('CPF deletado com sucesso.');
        }
    };

    return (
        <div>
            {currentCpf ? (
                <div className="edit-form">
                    <h4>CPF</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="number">
                                CPF
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    name="number"
                                    value={currentCpf.number}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <p>Data de registro: {currentCpf.createdAt} </p>
                        </div>
                    </form>

                    <button
                        type="button"
                        className="badge badge-danger mr-2"
                        onClick={deleteCpf}
                    >
                        Deletar
                    </button>
                    <button
                        type="submit"
                        className="badge badge-danger mr-2"
                        onClick={updateCpf}
                    >
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Clique em um CPF para visualizá-lo.</p>
                </div>
            )}
        </div>
    );
};

export default Cpf;
