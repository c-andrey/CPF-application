import React, { ChangeEvent, useState } from 'react';
import { CpfInterface } from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const cpfCreate = (): JSX.Element => {
    const initialState: CpfInterface = {
        number: '',
    };

    const [cpf, setCpf] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setCpf({ ...cpf, [name]: value });
    };

    const saveCpf = async (): Promise<void> => {
        setLoading(true);
        const data = {
            number: cpf.number,
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
                </div>
            )}

            <button type="submit" onClick={saveCpf} className="btn btn-success">
                Salvar
            </button>
        </div>
    );
};
export default cpfCreate;
