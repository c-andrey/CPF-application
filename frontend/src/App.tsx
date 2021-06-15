import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import CpfList from './components/cpfs/cpt-list/CpfList';
import CpfCreate from './components/cpfs/cpf-create/CpfCreate';
import Cpf from './components/cpfs/Cpf';
import Status from './components/status/Status';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = (): JSX.Element => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/cpfs" className="nav-link">
                            Lista de CPFs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add" className="nav-link">
                            Adicionar CPF
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/status" className="nav-link">
                            Status Servidor
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={['/', '/cpfs']} component={CpfList} />
                    <Route exact path="/add" component={CpfCreate} />
                    <Route exact path="/cpfs/:id" component={Cpf} />
                    <Route exact path="/status" component={Status} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
