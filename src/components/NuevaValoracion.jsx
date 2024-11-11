// src/components/NuevaValoracion.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const NuevaValoracion = ({ agregarValoracion }) => {
    const [autor, setAutor] = useState('');
    const [puntuacion, setPuntuacion] = useState('');
    const [series, setSeries] = useState([]); // Estado para las series
    const [serieSeleccionada, setSerieSeleccionada] = useState('');

    useEffect(() => {
        // Obtener la lista de series
        const fetchSeries = async () => {
            try {
                const response = await axios.get('/series');
                setSeries(response.data);
                // Si hay series, establecer la primera serie como seleccionada
                if (response.data.length > 0) {
                    setSerieSeleccionada(response.data[0].id);
                }
            } catch (error) {
                console.error('Error al obtener series:', error);
            }
        };

        fetchSeries();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaValoracion = {
            autor,
            puntuacion: parseFloat(puntuacion),
            serie: {
                id: serieSeleccionada
            },
        };

        axios.post('/valoraciones', nuevaValoracion)
            .then((response) => {
                agregarValoracion(response.data);
                // Limpiar campos
                setAutor('');
                setPuntuacion('');
                setSerieSeleccionada(response.data.serieId);
            })
            .catch((error) => {
                console.error('Error al agregar la valoración:', error);
            });
    };

    return (
        <Container className="mt-4">
            <h2>Nueva Valoración</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="autor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="puntuacion" className="mt-2">
                    <Form.Label>Puntuación</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={puntuacion}
                        onChange={(e) => setPuntuacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="serieSeleccionada" className="mt-2">
                    <Form.Label>Serie</Form.Label>
                    <Form.Select
                        value={serieSeleccionada}
                        onChange={(e) => setSerieSeleccionada(e.target.value)}
                        required
                    >
                        {series.map((serie) => (
                            <option key={serie.id} value={serie.id}>
                                {serie.nombre}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Añadir Valoración
                </Button>
            </Form>
        </Container>
    );
};

export default NuevaValoracion;