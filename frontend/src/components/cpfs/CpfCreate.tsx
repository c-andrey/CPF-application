import React, { ChangeEvent, useState } from 'react';
import * as cpfValidator from 'node-cpf';
import { CpfInterface } from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const CpfCreate = (): JSX.Element => {
    const initialState: CpfInterface = {
        number: '',
        blocked: false,
    };
    const [message, setMessage] = useState('');
    const [cpf, setCpf] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        if (!cpfValidator.validate(value)) {
            setMessage('CPF inválido.');
        } else {
            setMessage('');
        }
        setCpf({ ...cpf, [name]: value });
    };

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        const { name, checked } = event.target;
        setCpf({ ...cpf, [name]: checked });
    };

    const saveCpf = async (): Promise<void> => {
        setLoading(true);
        const data = {
            number: cpf.number,
            blocked: cpf.blocked,
        };

        const created = await actions.postCpf(data);
        setCpf(created);
        setLoading(false);
    };

    return (
        <div className="submit-form">
            {loading ? (
                <div>
                    <div className="loading" />
                </div>
            ) : (
                <div className="form-group">
                    <label htmlFor="number">
                        CPF:
                        <input
                            type="text"
                            className="form-control"
                            id="number"
                            required
                            value={cpf.number}
                            onChange={handleInputChange}
                            name="number"
                        />
                    </label>
                    <label htmlFor="blocked">
                        Blacklist
                        <input
                            type="checkbox"
                            name="blocked"
                            checked={cpf.blocked}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </div>
            )}

            <button type="submit" onClick={saveCpf} className="btn btn-success">
                Salvar
            </button>

            {message ? <div className="error">{message}</div> : ''}
        </div>
    );
};
export default CpfCreate;
