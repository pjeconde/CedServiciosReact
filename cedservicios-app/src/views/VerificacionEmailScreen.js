import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { Form } from 'react-bootstrap';

import { iniciarReenviarEmail, iniciarVerificacionEmail } from '../actions/auth';
import { LoadingSmall } from '../components/ui/LoadingSmall';
import { useForm } from '../hooks/useForm';

export const VerificacionEmailScreen = () => {

    const dispatch = useDispatch();
    const { errores, loading, redirect } = useSelector(state => state.ui);
    const { encriptado } = useParams();
    const { values, handleInputChange } = useForm({ nombreUsuario: '' });
    const { nombreUsuario } = values;

    const handleSubmit = () => {
        dispatch(iniciarReenviarEmail(nombreUsuario));
    }

    useEffect(() => {
        if (encriptado) {
            dispatch(iniciarVerificacionEmail(encriptado));
        }
    }, [encriptado, dispatch])

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <section>
            <div className="contenedor">
                <div className="d-flex">
                    <div>
                        <h1>Verificacion de email</h1>
                    </div>
                    {
                        loading && (
                            <div className="px-5">
                                <LoadingSmall />
                            </div>
                        )
                    }
                </div>
                {
                    errores && (
                        <div>
                            <Form.Group className="mb-3 w-50" controlId="formNombreUsuario">
                                <label>Nombre usuario</label>
                                <Form.Control
                                    type="text"
                                    name="nombreUsuario"
                                    value={nombreUsuario}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <div>
                                <div className="d-flex my-1">
                                    <button
                                        className="btn btn-lg btn-secondary"
                                        onClick={handleSubmit}
                                        type="button"
                                        disabled={loading}>
                                        Reenviar email
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
