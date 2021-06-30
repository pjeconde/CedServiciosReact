import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Container,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import validator from 'validator';
import { useForm } from '../hooks/useForm';
import { startChangePassword, startCheckAnswer, startCheckQuestion, startRemoveQuestionAndAnswer } from '../actions/auth';

export const RecoverPasswordScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { question, validAnswer } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.ui);
    const { values: formValues, handleInputChange } = useForm({
        userId: '',
        email: '',
        respuesta: '',
        password: '',
        password2: ''
    });

    const {
        userId,
        email,
        respuesta,
        password,
        password2 } = formValues;

    const handleSecurityQuestion = async (e) => {
        e.preventDefault();
        if (userId && validator.isEmail(email)) {
            dispatch(startCheckQuestion(userId, email));
        }
    }

    const handleRequestPassword = (e) => {
        e.preventDefault();
        if (respuesta.length > 4) {
            dispatch(startCheckAnswer(userId, email, respuesta))
        }
    }

    const handleConfirmPassword = (e) => {
        e.preventDefault();
        if (password === password2) {
            dispatch(startChangePassword());
        }
    }

    const handleCancel = () => {
        dispatch(startRemoveQuestionAndAnswer());
        history.goBack();
    }

    return (
        <Container>
            <h1>¿OLVIDÓ LA CONTRASEÑA DE SU CUENTA?</h1>
            <br />
            <span>Para establecer una nueva Contraseña para su cuenta eFact, siga las siguientes instrucciones: </span>
            <br />
            <br />
            <Form onSubmit={handleSecurityQuestion}>
                <Row>
                    <span >1) Ingrese Id.Usuario e Email
                        (luego haga clic en el botón 'Solicitar Pregunta de seguridad').
                    </span>
                </Row>
                <Row>
                    <Col>
                        <Form.Control
                            name="userId"
                            type="text"
                            autoComplete="none"
                            value={userId}
                            onChange={handleInputChange}
                            placeholder="ID Usuario" />
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
            <Form onSubmit={handleRequestPassword}>
                <Row>
                    <span >2) Responda la Pregunta de Seguridad
                        (luego haga clic en el botón 'Solicitar nuevo ingreso de Contraseña')
                    </span>
                    <Col>
                        <span>
                            <strong>
                                {
                                    (question) && `¿${question}?`
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
                    disabled={!question}
                    variant="dark"
                    type="submit" >
                    Solicitar nuevo ingreso de Contraseña
                </Button>
            </Form>
            <br />
            <Form onSubmit={handleConfirmPassword}>
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
                            onChange={handleInputChange}
                            placeholder="Contraseña Nueva" />
                    </Col>
                    <Col>
                        <Form.Control
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={handleInputChange}
                            placeholder="Confirmar contraseña" />
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Button
                            disabled={!validAnswer}
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
