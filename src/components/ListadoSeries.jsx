import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

const ListadoSeries = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        // Obtener series de la API
        axios.get('/series')
            .then(response => {
                setSeries(response.data);
            })
            .catch(error => {
                console.error('Error al obtener series:', error);
            });
    }, []);

    return (
        <ListGroup className="mt-4">
            {series.map((serie) => (
                <ListGroupItem key={serie.id} className="d-flex align-items-center">
                    <div>
                        <strong>{serie.nombre}</strong> ({serie.plataforma})
                        <ul style={{ marginLeft: '20px' }}>
                            {serie.valoraciones.map((valoracion) => (
                                <li key={valoracion.id}>
                                    {valoracion.autor}: {valoracion.puntuacion}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default ListadoSeries;