import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import validator from 'validator';
import { iniciarValidarIdUsuarioPorEmail } from '../actions/auth';
import { useForm } from '../hooks/useForm';


export const RecuperarNombreUsuarioScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { values, handleInputChange } = useForm({ email: '' });
    const { email } = values;

    const handleCancel = () => {
        history.goBack();
    }

    const handleCheckUserId = () => {
        if (!validator.isEmail(email)) {
            Swal.fire('Error', 'El campo email no debe estar vacío.', 'error');
            return false;
        }
        dispatch(iniciarValidarIdUsuarioPorEmail(email));
    }

    return (
        <section>
            <div className="contenedor" style={{ maxWidth: '800px' }}>
                <h3 className="mt-3 text-center">Olvido su nombre de usuario?</h3>
                <br />
                <div>
                    <p>
                        Si no recuerda el nombre de usuario de su cuenta, ingrese correo electrónico que registró en el momento de creación de su cuenta.
                    </p>
                    <p>
                        Le enviaremos su nombre de usuario por correo electrónico, a esa dirección:
                    </p>
                </div>
                <Form.Group className="mb-3" controlId="formEmail">
                    <label>Email</label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        autoComplete="off" />
                </Form.Group>
                <div>
                    <div className="w-50 m-auto d-flex justify-content-evenly my-4">
                        <Button
                            onClick={handleCheckUserId}
                            variant="secondary"
                            size="lg">
                            Solicitar Nombre Usuario
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="secondary"
                            size="lg" >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </section >
    )
}
