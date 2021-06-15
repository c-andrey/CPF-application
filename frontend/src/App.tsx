import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import CpfList from './components/cpfs/CpfList';
import CpfCreate from './components/cpfs/CpfCreate';

import 'bootstrap/dist/css/bootstrap.min.css';
import Cpf from './components/cpfs/Cpf';

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
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={['/', '/cpfs']} component={CpfList} />
                    <Route exact path="/add" component={CpfCreate} />
                    <Route exact path="/cpf/:id" component={Cpf} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
