import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import TopSeries from './components/TopSeries';
import ListadoSeries from './components/ListadoSeries';
import NuevaValoracion from "./components/NuevaValoracion";
import NuevaSerie from "./components/NuevaSerie";

const App = () => {
    return (
        <Router>
            <Container>
                <h1>Ranking de Series</h1>
                <Link to="/">
                    <Button color="primary" className="me-2">Listado de series</Button>
                </Link>
                <Link to="/nueva-serie">
                    <Button color="primary" className="me-2">Nueva Serie</Button>
                </Link>
                <Link to="/nueva-valoracion">
                    <Button color="secondary" className="me-2">Nueva Valoración</Button>
                </Link>
                <Link to="/top-series">
                    <Button color="success">Top Series</Button>
                </Link>

                <Switch>
                    <Route path="/nueva-valoracion" component={NuevaValoracion} />
                    <Route path="/nueva-serie" component={NuevaSerie} />
                    <Route path="/top-series" component={TopSeries} />
                    <Route path="/" exact component={ListadoSeries} />
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
