import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { startLoginEmailPassword } from '../actions/auth';
import { removeError, setError } from '../actions/ui';

import '../styles/login.css';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { msgError, loading } = useSelector(state => state.ui);
  const { values: formValues, handleInputChange } = useForm({
    usuario: 'pjeconde',
    contraseña: '123456'
  })

  const { usuario, contraseña } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(usuario, contraseña));
    }
  }

  const isFormValid = () => {
    if (!usuario || usuario.trim().length < 5) {
      dispatch(setError('Debe de ingresar el usuario.'));
      return false;
    }
    else if (!contraseña || contraseña.length < 5) {
      dispatch(setError('Debe de ingresar la contraseña'));
      return false;
    }
    dispatch(removeError());
    return true;
  }

  return (
    <div className="content" style={{ background: '#3bb2df' }}>
      <div className="container-login form-login footer-login p a"
        style={{ textAlign: 'center' }}>
        <div className="sexteen-columns">
          <h3 className="title-login">LOGIN</h3>
        </div>
        <Form onSubmit={handleLogin} >
          <Row>
            <Col>
              <Form.Control
                size="lg"
                type="email"
                placeholder="Usuario.."
                name="usuario"
                autoComplete="off"
                onChange={handleInputChange}
                value={usuario} />
            </Col>
            <Col>
              <Form.Control
                size="lg"
                type="password"
                placeholder="Contraseña.."
                name="contraseña"
                onChange={handleInputChange}
                value={contraseña} />
            </Col>
          </Row>
          <Button
            style={{
              marginTop: '15px',
              width: '140px',
              letterSpacing: '3px'
            }}
            size="lg"
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={handleLogin}>
            {loading ? 'Loading..' : 'Login'}
          </Button>
          {
            msgError &&
            (
              <div className="sexteen-columns" style={{ padding: '15px' }}>
                <span>{msgError}</span>
              </div>
            )
          }
          <div className="sexteen-columns">
            <p style={{ textAlign: 'center' }}>
              <Link to="./">
                CREAR UNA NUEVA CUENTA
              </Link>
              <Link to="./">
                ¿OLVIDÓ SU ID.USUARIO?
              </Link>
              <Link to="./">
                ¿OLVIDÓ SU CONTRASEÑA?
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  )
}
