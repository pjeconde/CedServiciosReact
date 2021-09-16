import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Container,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import validator from 'validator';
import { useForm } from '../hooks/useForm';
import {
    iniciarCambiarContraseña,
    iniciarValidarRespuestaSeguridad,
    iniciarObtenerPreguntaSeguridad,
    removerFormSeguridad,
} from '../actions/auth';

const initForm = {
    nombreCuenta: '',
    email: '',
    respuesta: '',
    password: '',
    password2: ''
}

export const CambiarPasswordScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { formSeguridad } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.ui);
    const { values: formValues, handleInputChange, reset } = useForm(initForm);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const {
        nombreCuenta,
        email,
        respuesta,
        respuestaValida,
        pregunta
    } = formValues;

    const onSubmitPreguntaSeguridad = (e) => {
        e.preventDefault();
        if (nombreCuenta && validator.isEmail(email)) {
            dispatch(iniciarObtenerPreguntaSeguridad(nombreCuenta, email));
        }
    }

    const onSubmitRespuestaSeguridad = (e) => {
        e.preventDefault();
        if (respuesta.length > 4) {
            dispatch(iniciarValidarRespuestaSeguridad(respuesta));
        }
    }

    const onSubmitCambiarClave = (e) => {
        e.preventDefault();
        if (password === password2) {
            dispatch(iniciarCambiarContraseña(password));
        } else {
            Swal.fire('Error', 'Las contraseñas no son iguales.', 'error');
        }
    }

    const handleCancel = () => {
        dispatch(removerFormSeguridad());
        history.goBack();
    }

    useEffect(() => {
        if (formSeguridad) {
            reset(formSeguridad);
        }
        else {
            setTimeout(() => {
                history.replace('/auth/ingresar');
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formSeguridad])

    return (
        <Container>
            <h1>¿OLVIDÓ LA CONTRASEÑA DE SU CUENTA?</h1>
            <br />
            <span>Para establecer una nueva Contraseña para su cuenta eFact, siga las siguientes instrucciones: </span>
            <br />
            <br />
            <Form onSubmit={onSubmitPreguntaSeguridad}>
                <Row>
                    <span >1) Ingrese Nombre de cuenta e Email
                        (luego haga clic en el botón 'Solicitar Pregunta de seguridad').
                    </span>
                </Row>
                <Row>
                    <Col>
                        <Form.Control
                            name="nombreCuenta"
                            type="text"
                            autoComplete="none"
                            value={nombreCuenta}
                            onChange={handleInputChange}
                            placeholder="Nombre de cuenta" />
                    </Col>
                    <Col>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Email" />
                    </Col>
                </Row>
                <Button
                    disabled={loading}
                    variant="dark"
                    type="submit" >
                    {loading ? 'Loading..' : 'Solicitar Pregunta de Seguridad'}
                </Button>
            </Form>
            <br />
            <Form onSubmit={onSubmitRespuestaSeguridad}>
                <Row>
                    <span >2) Responda la Pregunta de Seguridad
                        (luego haga clic en el botón 'Solicitar nuevo ingreso de Contraseña')
                    </span>
                    <Col>
                        <span>
                            <strong>
                                {
                                    (pregunta) && `¿${pregunta}?`
                                }
                            </strong>
                        </span>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Label htmlFor="respuesta">
                            <strong>Respuesta</strong>
                        </Form.Label>
                        <Form.Control
                            id="respuesta"
                            type="text"
                            name="respuesta"
                            value={respuesta}
                            onChange={handleInputChange}
                            placeholder="Respuesta" />
                    </Col>
                </Row>
                <Button
                    disabled={!pregunta}
                    variant="dark"
                    type="submit" >
                    Solicitar nuevo ingreso de Contraseña
                </Button>
            </Form>
            <br />
            <Form onSubmit={onSubmitCambiarClave}>
                <Row>
                    <Col>
                        <span >
                            3) Ingrese, y confirme, su nueva Contraseña
                            (luego haga click en el botón 'Aceptar').
                        </span>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña Nueva" />
                    </Col>
                    <Col>
                        <Form.Control
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="Confirmar contraseña" />
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Button
                            disabled={!respuestaValida}
                            variant="dark"
                            type="submit" >
                            Acceptar
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="dark"
                            onClick={handleCancel} >
                            Cancelar
                        </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Form>
        </Container>

    )
}
