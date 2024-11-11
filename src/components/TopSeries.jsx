import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container,  ListGroup, ListGroupItem } from 'react-bootstrap';

const TopSeries = () => {
    const [topSeries, setTopSeries] = useState([]);

    useEffect(() => {

        axios.get('/series/top')
            .then(response => {
                setTopSeries(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las series top:', error);
            });
    }, []);

    return (
        <Container>
            <h1>Top Series</h1>
            <ListGroup className="mt-4">
                {topSeries.map((serie, index) => (
                    <ListGroupItem key={serie.id} className="d-flex align-items-center justify-content-between">
                        <div className="d-flex w-100 align-items-center">

                            <div style={{ width: '50px' }}>
                                <strong>{index + 1}.</strong>
                            </div>

                            <div style={{ width: '120px' }}>
                                <img
                                    src={serie.caratulaUrl}
                                    alt={serie.nombre}
                                    style={{width: '100px'}}
                                />
                            </div>

                            <div className="ms-3" style={{ flex: '1' }}>
                                <strong>{serie.nombre}</strong>
                            </div>

                            <div className="ms-3" style={{ width: '150px' }}>
                                <strong>{serie.plataforma}</strong>
                            </div>

                            <div className="ms-3" style={{ flex: '2' }}>
                                <p>{serie.sinopsis}</p>
                            </div>

                            <div style={{ width: '100px', textAlign: 'right' }}>
                                {serie.mediaValoracion !== null ? serie.mediaValoracion.toFixed(2) : 'Sin Valoración'}
                            </div>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default TopSeries;
