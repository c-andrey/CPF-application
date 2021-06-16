import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import * as cpfValidator from 'node-cpf';
import { CpfListInterface } from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const Cpf = (props: RouteComponentProps<{ id: string }>): JSX.Element => {
    const history = useHistory();
    const initialCpfState = {
        id: '',
        number: '',
        blocked: false,
        createdAt: '',
    };

    const [currentCpf, setCurrentCpf] =
        useState<CpfListInterface>(initialCpfState);
    const [message, setMessage] = useState('');

    const getCpf = async (id: string): Promise<void> => {
        const cpf = await actions.getCpf({ id });
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
        if (!cpfValidator.validate(value)) {
            setMessage('CPF inválido.');
        } else {
            setMessage('');
        }
        setCurrentCpf({ ...currentCpf, [name]: value });
    };

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        const { name, checked } = event.target;
        setCurrentCpf({ ...currentCpf, [name]: checked });
    };

    const updateCpf = async (): Promise<void> => {
        const cpf = {
            id: currentCpf.id,
            number: cpfValidator.unMask(currentCpf.number),
            blocked: currentCpf.blocked,
        };

        const updated = await actions.putCpf(cpf);
        setCurrentCpf(updated);
        setMessage('CPF atualizado com sucesso.');
    };

    const deleteCpf = async (): Promise<void> => {
        const deleted = await actions.deleteCpf(currentCpf.id);
        if (deleted) {
            setMessage('CPF deletado com sucesso.');
            history.push('/cpfs');
        }
    };

    return (
        <div>
            {currentCpf ? (
                <div className="edit-form">
                    <h4>CPF</h4>
                    <form>
                        <div className="form-item">
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
                        <div className="form-item">
                            <label htmlFor="blocked">
                                Blacklist
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    name="blocked"
                                    checked={currentCpf.blocked}
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                        </div>
                        <div className="form-item">
                            <p>Data de registro: {currentCpf.createdAt} </p>
                        </div>
                    </form>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={deleteCpf}
                    >
                        Deletar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-outline-secondary"
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
