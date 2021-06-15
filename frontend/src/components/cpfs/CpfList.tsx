import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { CpfInterface, CpfListInterface } from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const CpfList = (): JSX.Element => {
    const [cpfs, setCpfs] = useState<CpfListInterface[]>([]);
    const [currentCpf, setCurrentCpf] = useState<CpfListInterface | null>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [filters, setFilters] = useState<Partial<CpfInterface>>({
        number: '',
        blocked: false,
    });
    const [loading, setLoading] = useState(false);

    const retrieveCpfs = async (): Promise<void> => {
        setLoading(true);
        const data = await actions.getCpf();
        setCpfs(data as CpfListInterface[]);
        setLoading(false);
    };
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        const { name, checked } = event.target;
        setFilters({ ...filters, [name]: checked });
    };

    const refreshList = () => {
        retrieveCpfs();
    };

    const setActiveCpf = (cpf: CpfListInterface, index: number) => {
        setCurrentCpf(cpf);
        setCurrentIndex(index);
    };

    const resetFilters = () => {
        setFilters({ number: '', blocked: false });
    };

    const findByCpf = async (e: MouseEvent, listAll = false) => {
        setLoading(true);

        const data = await actions.getCpf(listAll ? null : filters);
        setCpfs(data as CpfListInterface[]);
        if (listAll) {
            resetFilters();
        }
        setLoading(false);
    };

    useEffect(() => {
        retrieveCpfs();
    }, []);
    return (
        <div className="list row">
            <div className="col-md-8">
                <form className="input-group mb-3">
                    <input
                        type="text"
                        name="number"
                        className="form-control"
                        placeholder="Procurar pelo CPF"
                        value={filters.number as string}
                        onChange={onChangeSearch}
                    />

                    <label htmlFor="blocked">
                        Blacklist
                        <input
                            type="checkbox"
                            name="blocked"
                            checked={filters.blocked as boolean}
                            onChange={handleCheckboxChange}
                        />
                    </label>

                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={event => findByCpf(event)}
                        >
                            Procurar
                        </button>
                    </div>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={event => findByCpf(event, true)}
                        >
                            Listar Todos
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-md-6">
                <h4>Lista de CPFs</h4>

                <ul className="list-group">
                    {cpfs &&
                        cpfs.map((cpf, index) => (
                            <li
                                className={`list-group-item ${
                                    index === currentIndex ? 'active' : ''
                                } ${cpf.blocked ? 'blocked' : ''}`}
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
                        <div>
                            <span>
                                <strong>Blacklist: </strong>
                            </span>{' '}
                            {currentCpf.blocked ? 'Sim' : 'Não'}
                        </div>
                        <Link
                            to={`/cpfs/${currentCpf.id}`}
                            className="badge badge-warning"
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
