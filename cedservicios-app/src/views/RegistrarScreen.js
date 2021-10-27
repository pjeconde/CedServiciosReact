import React, { useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Col,
    Row,
    Button,
} from 'react-bootstrap';
import { textoTerminoYCondiciones } from '../helpers/terminoYCondiciones';

import { useForm } from '../hooks/useForm';
import { iniciarValidarNombreUsuario, iniciarRegistroUsuario } from '../actions/auth';
import { removeError, removeRedirect } from '../actions/ui';
import { camelCase } from '../helpers/camelCase';


export const RegistrarScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, errores, redirect } = useSelector(state => state.ui);

    const {
        values: formValues,
        handleInputChange,
        errors: formErrors,
        setErrors } = useForm({
            nombreUsuario: '',
            telefono: '',
            email: '',
            nombre: '',
            apellido: '',
            clave: '',
            confirmarClave: '',
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
        confirmarClave,
        pregunta,
        respuesta
    } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(iniciarRegistroUsuario({
            nombreUsuario,
            nombreCompleto: `${nombre} ${apellido}`,
            clave,
            confirmarClave,
            telefono,
            email,
            pregunta,
            respuesta
        }));
    }

    const handleValidarNombreUsuario = () => dispatch(iniciarValidarNombreUsuario(nombreUsuario));

    const handleCancel = () => history.replace('/auth/login');

    useEffect(() => {
        if (errores) {
            let err = {};
            Object.keys(errores).map((key) => err[camelCase(key)] = errores[key][0]);
            setErrors(err);
        }
    }, [errores, setErrors])

    useEffect(() => {
        return () => {
            dispatch(removeError());
            dispatch(removeRedirect());
        }
    }, [dispatch])

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <section>
            <div className="contenedor" style={{ maxWidth: '800px' }}>
                <h4 className="mt-3 text-center">Crear Usuario</h4>
                <p className="divider-text">
                    <span className="bg-light"></span>
                </p>
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formNombre">
                        <label>Nombre/s</label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            placeholder="Nombres"
                            isInvalid={!!formErrors?.nombre}
                            value={nombre}
                            onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formApellido">
                        <label>Apellido</label>
                        <Form.Control
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            isInvalid={!!formErrors?.apellido}
                            value={apellido}
                            onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.apellido}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTelefono">
                        <label>Telefono</label>
                        <Form.Control
                            type="number"
                            name="telefono"
                            placeholder="Telefono"
                            autoComplete="none"
                            isInvalid={!!formErrors?.telefono}
                            value={telefono}
                            onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.telefono}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <label>Email</label>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="email"
                                value={email}
                                isInvalid={!!formErrors?.email}
                                placeholder="Email"
                                onChange={handleInputChange} />
                            <Form.Text className="text-muted fw-bold">(Importante: la confirmación de la cuenta se hace vía mail, a esta dirección)</Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formNombreUsuario">
                                <label>Nombre Usuario</label>
                                <Form.Control
                                    type="text"
                                    name="nombreUsuario"
                                    placeholder="Nombre Usuario"
                                    isInvalid={!!formErrors?.nombreUsuario}
                                    value={nombreUsuario}
                                    onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.nombreUsuario}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-start align-items-center">
                            <Button variant="secondary" onClick={handleValidarNombreUsuario}>
                                ¿Nombre de usuario disponible?
                            </Button>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formClave">
                        <label>Clave</label>
                        <Form.Control
                            type="password"
                            name="clave"
                            isInvalid={!!formErrors?.clave}
                            value={clave}
                            onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.clave}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConnfirmarClave">
                        <label>Confirmar Clave</label>
                        <Form.Control
                            type="password"
                            name="confirmarClave"
                            isInvalid={!!formErrors?.confirmarClave}
                            value={confirmarClave}
                            onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.confirmarClave}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPregunta">
                        <label>Pregunta de seguridad</label>
                        <Form.Control
                            type="text"
                            name="pregunta"
                            isInvalid={!!formErrors?.pregunta}
                            value={pregunta}
                            onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.pregunta}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRespuesta">
                        <label>Respuesta</label>
                        <Form.Control
                            type="text"
                            name="respuesta"
                            isInvalid={!!formErrors?.respuesta}
                            value={respuesta}
                            onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.respuesta}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTerminosYcondiciones">
                        <label>Términos y Condiciones de Servicio</label>
                        <Form.Control
                            style={{ height: '150px', fontSize: 'XX-Small' }}
                            as="textarea"
                            name="politicas"
                            autoComplete="none"
                            readOnly
                            defaultValue={textoTerminoYCondiciones} />
                    </Form.Group>
                    <div>
                        <div className="w-50 m-auto d-flex justify-content-evenly my-4">
                            <Button
                                variant="secondary"
                                type="submit"
                                size="lg"
                                disabled={loading} >
                                {(loading) ? 'Loading..' : 'Crear Cuenta'}
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="secondary"
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
