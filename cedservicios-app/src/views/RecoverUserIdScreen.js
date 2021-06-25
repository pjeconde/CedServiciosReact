import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Container,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import validator from 'validator';
import { startCheckUserIdByEmail } from '../actions/auth';
import { useForm } from '../hooks/useForm';


export const RecoverUserIdScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { values, handleInputChange } = useForm({ email: '' });
    const { email } = values;

    const handleCancel = () => {
        history.goBack();
    }

    const handleCheckUserId = () => {
        if (validator.isEmail(email)) {
            dispatch(startCheckUserIdByEmail(email));
        }
    }

    return (
        <section>
            <Container>
                <Row >
                    <h3>Olvido su Id.Usuario?</h3>
                    <br />
                    <div>
                        <Row>
                            Si no recuerda el Id.Usuario de su cuenta, ingrese el eMail que registró en el momento de creación de su cuenta.
                        </Row>
                        <Row>
                            Le enviaremos su Id.Cuenta por correo electrónico, a esa dirección
                        </Row>
                        <br />
                    </div>
                    <Row >
                        <Col sm="2">
                            <Form.Label >
                                Email
                            </Form.Label>
                        </Col>
                        <Col sm="6">
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                autoComplete="none" />
                        </Col>
                    </Row>
                    <br />
                    <Row style={{ alignItems: 'center' }}>
                        <Col sm="3">
                            <Button
                                onClick={handleCheckUserId}
                                variant="dark">
                                Solicitar Id.Usuario
                            </Button>
                        </Col>
                        <Col sm="1" />
                        <Col sm="3">
                            <Button
                                onClick={handleCancel}
                                variant="dark">
                                Cancelar
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </section>
    )
}
