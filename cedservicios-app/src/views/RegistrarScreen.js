import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import Swal from 'sweetalert2';
import {
    Form,
    Col,
    Row,
    Button
} from 'react-bootstrap';
import { textoTerminoYCondiciones } from '../helpers/terminoYCondiciones';

import { useForm } from '../hooks/useForm';
import { iniciarValidarNombreUsuario, iniciarRegistroUsuario } from '../actions/auth';
import { removeError, setError } from '../actions/ui';


export const RegistrarScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, msgError, label } = useSelector(state => state.ui);
    const [validated, setValidated] = useState(false);

    const { values: formValues, handleInputChange } = useForm({
        nombreUsuario: '',
        telefono: '',
        email: '',
        nombre: '',
        apellido: '',
        clave: '',
        clave2: '',
        pregunta: '',
        respuesta: '',
    });

    const {
        nombreUsuario,
        nombre,
        apellido,
        telefono,
        email,
        clave,
        clave2,
        pregunta,
        respuesta
    } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(iniciarRegistroUsuario({
                nombreUsuario,
                nombre,
                apellido,
                clave,
                telefono,
                email,
                pregunta,
                respuesta
            }));
            setValidated(true);
        }
        setValidated(false);
    }

    const handleValidarNombreUsuario = () => {
        if (nombreUsuario) {
            dispatch(iniciarValidarNombreUsuario(nombreUsuario));
        }
    }

    const handleCancel = () => {
        history.replace('/auth/login');
    }

    const isFormValid = () => {
        if (!nombreUsuario) {
            dispatch(setError('Nombre de usuario no válido.', 'nombreUsuario'));
            return false;
        }
        else if (nombreUsuario === label) {
            dispatch(setError('Nombre de usuario no disponible.', 'nombreUsuario'));
            return false;
        }
        else if (!nombre) {
            dispatch(setError('El nombre no es válido.', 'nombre'));
            return false;
        }
        else if (!apellido) {
            dispatch(setError('El apellido no es válido.', 'apellido'));
            return false;
        }
        else if (!validator.isEmail(email)) {
            dispatch(setError('El email no es válido.', 'email'));
            return false;
        }
        else if (!clave || clave !== clave2) {
            dispatch(setError('La contraseña no es valida.', 'clave'));
            return false;
        }
        else if (pregunta.trim().length < 7) {
            dispatch(setError('Pregunta no válida.', 'pregunta'));
            return false;
        }
        else if (respuesta.trim().length < 4) {
            dispatch(setError('Respuesta no válida.', 'respuesta'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    useEffect(() => {
        if (msgError) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: msgError
            });
        }
    }, [msgError])

    return (
        <div className="container" >
            <Form
                noValidate
                onSubmit={handleRegister}
                validated={validated} >
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>
                            Nombre
                        </Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="nombre"
                            type="text"
                            autoComplete="none"
                            required
                            isInvalid={label === 'nombre'}
                            value={nombre}
                            onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Apellido</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="apellido"
                            type="text"
                            autoComplete="none"
                            required
                            isInvalid={label === 'apellido'}
                            value={apellido}
                            onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Telefono</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="telefono"
                            type="number"
                            autoComplete="none"
                            required
                            isInvalid={label === 'telefono'}
                            value={telefono}
                            onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Email</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Control
                                name="email"
                                type="text"
                                value={email}
                                required
                                isInvalid={label === 'email'}
                                onChange={handleInputChange} />
                            <Form.Text className="text-muted">(Muy importante: la confirmación de la Cuenta se hace, vía mail, a esta dirección)</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Nombre Usuario</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="nombreUsuario"
                            type="text"
                            autoComplete="none"
                            required
                            isInvalid={label === 'nombreUsuario'}
                            value={nombreUsuario}
                            onChange={handleInputChange} />
                    </Col>
                    <Col sm={3}>
                        <Button
                            style={{ marginTop: '0' }}
                            variant="secondary"
                            onClick={handleValidarNombreUsuario}
                        >
                            ¿Nombre de usuario disponible?
                        </Button>
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Contraseña</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="clave"
                            type="password"
                            autoComplete="none"
                            required
                            isInvalid={label === 'clave'}
                            value={clave}
                            onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="clave2"
                            type="password"
                            autoComplete="none"
                            required
                            isInvalid={label === 'clave'}
                            value={clave2}
                            onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Pregunta de seguridad</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="pregunta"
                            type="text"
                            autoComplete="none"
                            required
                            isInvalid={label === 'pregunta'}
                            value={pregunta}
                            onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Repuesta</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            name="respuesta"
                            type="text"
                            autoComplete="none"
                            required
                            isInvalid={label === 'respuesta'}
                            value={respuesta}
                            onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row style={{ margin: '5px' }}>
                    <Col sm={2}>
                        <Form.Label>Términos y Condiciones de Servicio</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control
                            style={{ height: '150px', fontSize: 'XX-Small', width: '360px' }}
                            as="textarea"
                            name="politics"
                            autoComplete="none"
                            readOnly
                            defaultValue={textoTerminoYCondiciones} />
                    </Col>
                </Row>
                {
                    msgError && (
                        <Row>
                            <Col sm={2}>
                                <Form.Control.Feedback>{msgError}</Form.Control.Feedback>
                            </Col>
                        </Row>
                    )
                }
                <Row aria-colspan={2} style={{ marginLeft: '50px', alignItems: 'center' }}>
                    <Col sm={2}>
                        <Button
                            variant="secondary"
                            type="submit"
                            size="lg"
                            disabled={loading} >
                            {(loading) ? 'Loading..' : 'Crear Cuenta'}
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <Button
                            onClick={handleCancel}
                            variant="secondary"
                            size="lg" >
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
