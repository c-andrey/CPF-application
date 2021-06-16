import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import * as cpfValidator from 'node-cpf';
import {
    CpfListInterface,
    FilterInterface,
} from '../../../interfaces/CpfInterface';
import actions from '../../../services/CpfService';

import './CpfList.css';

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
        if (cpfValidator.validate(value) || value === '') {
            setMessage('');
        } else {
            setMessage('CPF Inválido.');
        }
        setFilters({ ...filters, [name]: cpfValidator.unMask(value) });
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
        e.preventDefault();
        const data = await actions.getCpf(listAll ? null : filters);
        setCpfs(data as CpfListInterface[]);
        if (listAll) {
            resetFilters();
        }
    };

    const getDateFormatted = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    useEffect(() => {
        retrieveCpfs();
    }, []);
    return (
        <div className="row">
            <div className="column col-md-4">
                <form className="column center input-group mb-3">
                    <div className="form-item">
                        <label htmlFor="number">
                            CPF:
                            <input
                                type="text"
                                name="number"
                                className="form-control"
                                placeholder="Procurar pelo CPF"
                                value={filters.number as string}
                                onChange={onChangeNumber}
                            />
                        </label>
                    </div>

                    <div className="form-item">
                        <label htmlFor="blocked">
                            Listar CPFs bloqueados
                            <input
                                className="form-checkbox"
                                type="checkbox"
                                name="blocked"
                                checked={filters.blocked as boolean}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                    </div>

                    <div className="form-item">
                        <label htmlFor="sort">
                            Ordenação:
                            <select
                                className="form-select"
                                name="sort"
                                id="sort"
                                onChange={handleSelectChange}
                            >
                                <option value="asc">
                                    Número do CPF crescente
                                </option>
                                <option value="desc">
                                    Número do CPF decrescente
                                </option>
                            </select>
                        </label>
                    </div>
                    <div className="input-group-append form-item">
                        <button
                            disabled={!!message}
                            className="btn btn-outline-secondary"
                            type="submit"
                            onClick={event => findByCpf(event)}
                        >
                            Procurar
                        </button>
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
            <div className="column col-md-4">
                <h4>Lista de CPFs</h4>

                <ul className="list-group">
                    {cpfs &&
                        cpfs.map((cpf, index) => (
                            <button
                                type="button"
                                onClick={() => setActiveCpf(cpf, index)}
                                key={cpf.id}
                            >
                                <li
                                    className={`list-group-item ${
                                        index === currentIndex ? 'active' : ''
                                    } ${cpf.blocked ? 'blocked' : ''}`}
                                >
                                    {cpf.number}
                                </li>
                            </button>
                        ))}
                </ul>
            </div>

            <div className="column col-md-4">
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
                            {getDateFormatted(currentCpf.createdAt)}
                        </div>
                        <div>
                            <span>
                                <strong>Blacklist: </strong>
                            </span>{' '}
                            {currentCpf.blocked ? 'Sim' : 'Não'}
                        </div>
                        <Link
                            to={`/cpfs/${currentCpf.id}`}
                            className="btn btn-outline-secondary"
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
