import React, { useState, useEffect, ChangeEvent } from 'react';
import { CpfInterface, CpfListInterface } from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const CpfList = (props: CpfInterface[]) => {
    const [cpfs, setCpfs] = useState<CpfListInterface[]>([]);
    const [searchCpf, setSearchCpf] = useState('');
    const [loading, setLoading] = useState(false);

    const retrieveCpfs = async (): Promise<void> => {
        setLoading(true);
        const data = await actions.getCpf();
        setCpfs(data);
        setLoading(false);
    };
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchCpf(e.target.value);
    };

    const refreshList = () => {
        retrieveCpfs();
    };

    const findByCpf = async () => {
        setLoading(true);
        const data = await actions.getCpf({ number: searchCpf });
        setCpfs(data);
        setLoading(false);
    };

    useEffect(() => {
        retrieveCpfs();
    }, []);
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Procurar pelo CPF"
                        value={searchCpf}
                        onChange={onChangeSearch}
                    />

                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByCpf}
                        >
                            Procurar
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Lista de CPFs</h4>

                <ul className="list-group">
                    {cpfs &&
                        cpfs.map((cpf, index) => (
                            <li className="list-group-item" key={cpf.id}>
                                {cpf.number}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default CpfList;
