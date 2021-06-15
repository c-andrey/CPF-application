import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { CpfInterface, CpfListInterface } from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const CpfList = (props: CpfInterface[]) => {
    const [cpfs, setCpfs] = useState<CpfListInterface[]>([]);
    const [currentCpf, setCurrentCpf] = useState<CpfListInterface | null>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchCpf, setSearchCpf] = useState('');
    const [loading, setLoading] = useState(false);

    const retrieveCpfs = async (): Promise<void> => {
        setLoading(true);
        const data = await actions.getCpf();
        setCpfs(data as CpfListInterface[]);
        setLoading(false);
    };
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchCpf(e.target.value);
    };

    const refreshList = () => {
        retrieveCpfs();
    };

    const setActiveCpf = (cpf: CpfListInterface, index: number) => {
        setCurrentCpf(cpf);
        setCurrentIndex(index);
    };

    const findByCpf = async () => {
        setLoading(true);
        const data = await actions.getCpf({ number: searchCpf });
        setCpfs(data as CpfListInterface[]);
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
                            <li
                                className={`list-group-item ${
                                    index === currentIndex ? 'active' : ''
                                }`}
                                key={cpf.id}
                            >
                                <button
                                    type="button"
                                    onClick={() => setActiveCpf(cpf, index)}
                                >
                                    {cpf.number}
                                </button>
                            </li>
                        ))}
                </ul>
            </div>

            <div className="col-md-6">
                {currentCpf ? (
                    <div>
                        <h4>CPF</h4>
                        <div>
                            <span>
                                <strong>CPF: </strong>
                            </span>{' '}
                            {currentCpf.number}
                        </div>
                        <div>
                            <span>
                                <strong>Data de Registro: </strong>
                            </span>{' '}
                            {currentCpf.createdAt}
                        </div>
                        <Link
                            to={`/cpfs/${currentCpf.id}`}
                            className="btn badge badge-warning"
                        >
                            Editar
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Clique em um CPF para editá-lo</p>
                        <br />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CpfList;
