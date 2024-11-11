// src/components/NuevaSerie.jsx

import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const NuevaSerie = ({ agregarSerie }) => {
    const [nombre, setNombre] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [caratulaUrl, setCaratulaUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaSerie = {
            nombre,
            plataforma,
            sinopsis,
            caratulaUrl,
        };

        axios.post('/series', nuevaSerie)
            .then(response => {
                agregarSerie(response.data);
                setNombre('');
                setPlataforma('');
                setSinopsis('');
                setCaratulaUrl('');
            })
            .catch(error => {
                console.error('Error al agregar la serie:', error);
            });
    };

    return (
        <Container className="mt-4">
            <h2>Añadir Nueva Serie</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la serie"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPlataforma">
                    <Form.Label>Plataforma</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la plataforma"
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formSinopsis">
                    <Form.Label>Sinopsis</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la sinopsis"
                        value={sinopsis}
                        onChange={(e) => setSinopsis(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCaratulaUrl">
                    <Form.Label>URL de la Carátula</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la URL de la carátula"
                        value={caratulaUrl}
                        onChange={(e) => setCaratulaUrl(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">Agregar Serie</Button>
            </Form>
        </Container>
    );
};

export default NuevaSerie;
