import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import * as cpfValidator from 'node-cpf';
import {
    CpfListInterface,
    FilterInterface,
} from '../../interfaces/CpfInterface';
import actions from '../../services/CpfService';

const CpfList = (): JSX.Element => {
    const [cpfs, setCpfs] = useState<CpfListInterface[]>([]);
    const [currentCpf, setCurrentCpf] = useState<CpfListInterface | null>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [message, setMessage] = useState('');
    const [filters, setFilters] = useState<Partial<FilterInterface>>({
        number: '',
        blocked: false,
        sort: 'asc',
    });

    const retrieveCpfs = async (): Promise<void> => {
        const data = await actions.getCpf();
        setCpfs(data as CpfListInterface[]);
    };
    const onChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (!cpfValidator.validate(value)) {
            setMessage('CPF inválido.');
        } else {
            setMessage('');
        }
        setFilters({ ...filters, [name]: value });
    };

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        const { name, checked } = event.target;
        setFilters({ ...filters, [name]: checked });
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target.selectedOptions[0];
        setFilters({
            ...filters,
            sort: value,
        });
    };

    const setActiveCpf = (cpf: CpfListInterface, index: number) => {
        setCurrentCpf(cpf);
        setCurrentIndex(index);
    };

    const resetFilters = () => {
        setFilters({ number: '', blocked: false });
    };

    const findByCpf = async (e: MouseEvent, listAll = false) => {
        const data = await actions.getCpf(listAll ? null : filters);
        setCpfs(data as CpfListInterface[]);
        if (listAll) {
            resetFilters();
        }
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
                        onChange={onChangeNumber}
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

                    <label htmlFor="sort">
                        Ordenação:
                        <select
                            name="sort"
                            id="sort"
                            onChange={handleSelectChange}
                        >
                            <option value="asc">Número do CPF crescente</option>
                            <option value="desc">
                                Número do CPF decrescente
                            </option>
                        </select>
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
                {message ? <div className="error">{message}</div> : ''}
            </div>
            <div className="col-md-6">
                <h4>Lista de CPFs</h4>

                <ul className="list-group">
                    {cpfs &&
                        cpfs.map((cpf, index) => (
                            <button
                                type="button"
                                onClick={() => setActiveCpf(cpf, index)}
                            >
                                <li
                                    className={`list-group-item ${
                                        index === currentIndex ? 'active' : ''
                                    } ${cpf.blocked ? 'blocked' : ''}`}
                                    key={cpf.id}
                                >
                                    {cpf.number}
                                </li>
                            </button>
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
