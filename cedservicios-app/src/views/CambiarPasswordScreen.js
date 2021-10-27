import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
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
    nombreUsuario: '',
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
        nombreUsuario,
        email,
        respuesta,
        respuestaValida,
        pregunta
    } = formValues;

    const onSubmitPreguntaSeguridad = (e) => {
        e.preventDefault();
        if (!nombreUsuario) {
            Swal.fire('Error', 'El campo nombre de usuario no debe estar vacío.', 'error');
            return false;
        }
        if (!validator.isEmail(email)) {
            Swal.fire('Error', 'El campo email no debe estar vacío.', 'error');
            return false;
        }
        if (nombreUsuario && validator.isEmail(email)) {
            dispatch(iniciarObtenerPreguntaSeguridad(nombreUsuario, email));
        }
    }

    const onSubmitRespuestaSeguridad = (e) => {
        e.preventDefault();
        if (respuesta) {
            dispatch(iniciarValidarRespuestaSeguridad(respuesta));
        }
        else {
            Swal.fire('Error', 'El campo respuesta no debe estar vacío.', 'error');
            return false;
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
        <section>
            <div className="contenedor" style={{ maxWidth: '800px' }}>
                <h1>¿OLVIDÓ LA CONTRASEÑA DE SU CUENTA?</h1>
                <br />
                <h5>Para establecer una nueva Contraseña para su cuenta eFact, siga las siguientes instrucciones: </h5>
                <br />
                <Form onSubmit={onSubmitPreguntaSeguridad}>
                    <Row>
                        <h6 className="mb-3">
                            1) Ingrese Nombre de cuenta e Email
                            (luego haga clic en el botón 'Solicitar Pregunta de seguridad').
                        </h6>
                        <Col>
                            <Form.Control
                                name="nombreUsuario"
                                type="text"
                                autoComplete="none"
                                value={nombreUsuario}
                                onChange={handleInputChange}
                                placeholder="Nombre de usuario" />
                        </Col>
                        <Col className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                placeholder="Email" />
                        </Col>
                        <div className="d-flex justify-content-center">
                            <Button
                                className="w-50"
                                disabled={loading}
                                variant="dark"
                                type="submit" >
                                {loading ? 'Loading..' : 'Solicitar Pregunta de Seguridad'}
                            </Button>
                        </div>
                    </Row>
                </Form>
                <Form className="mt-4" onSubmit={onSubmitRespuestaSeguridad}>
                    <Row>
                        <h6 className="mb-3">
                            2) Responda la Pregunta de Seguridad
                            (luego haga clic en el botón 'Solicitar nuevo ingreso de Contraseña')
                        </h6>
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
                    <Row>
                        <Form.Group className="mb-3" controlId="formRespuesta">
                            <label>Respuesta</label>
                            <Form.Control
                                type="text"
                                name="respuesta"
                                value={respuesta}
                                onChange={handleInputChange}
                                placeholder="Respuesta" />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button
                                className="w-50"
                                disabled={!pregunta}
                                variant="dark"
                                type="submit" >
                                Solicitar nuevo ingreso de Contraseña
                            </Button>
                        </div>
                    </Row>
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
                    <div>
                        <div className="w-50 m-auto d-flex justify-content-evenly my-4">
                            <Button
                                disabled={!respuestaValida}
                                variant="dark"
                                size="lg"
                                type="submit" >
                                Aceptar
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="dark"
                                size="lg" >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </section>
    )
}
