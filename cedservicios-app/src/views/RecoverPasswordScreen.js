import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Container,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import { useForm } from '../hooks/useForm';

export const RecoverPasswordScreen = () => {

    const history = useHistory();
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

    const handleSecurityQuestion = (e) => {
        e.preventDefault();
        console.log('handleSecurityQuestion');
    }

    const handleRequestPassword = (e) => {
        e.preventDefault();
        console.log('handleRequestPassword');
    }

    const handleConfirmPassword = (e) => {
        e.preventDefault();
        console.log('handleConfirmPassword');
    }

    const handleCancel = () => {
        console.log('handleCancel');
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
                <span >1) Ingrese Id.Usuario e Email
                    (luego haga clic en el botón 'Solicitar Pregunta de seguridad').</span>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            name="userId"
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
                    variant="dark"
                    type="submit" >
                    Solicitar Pregunta de Seguridad
                </Button>
            </Form>
            <br />
            <Form onSubmit={handleRequestPassword}>
                <span >2) Responda la Pregunta de Seguridad
                    (luego haga clic en el botón 'Solicitar nuevo ingreso de Contraseña')</span>
                <br />
                <Row>
                    <Col>
                        <Form.Label htmlFor="respuesta">
                            <strong>Pregunta de seguridad</strong>
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
                    variant="dark"
                    type="submit" >
                    Solicitar nuevo ingreso de Contraseña
                </Button>
            </Form>
            <br />
            <Form onSubmit={handleConfirmPassword}>
                <span >3) Ingrese, y confirme, su nueva Contraseña
                    (luego haga click en el botón 'Aceptar').</span>
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
