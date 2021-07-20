import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Form,
  Col,
  Button,
  Row,
} from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { startLogin } from '../actions/auth';
import { removeError, setError } from '../actions/ui';

import '../styles/base.css';
import '../styles/login.css';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { msgError, loading } = useSelector(state => state.ui);
  const { values: formValues, handleInputChange } = useForm({
    id: 'pjeconde',
    clave: '123456'
  })

  const { id, clave } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLogin(id, clave));
    }
  }

  const isFormValid = () => {
    if (!id || id.trim().length < 5) {
      dispatch(setError('Debe de ingresar el id.'));
      return false;
    }
    else if (!clave || clave.length < 5) {
      dispatch(setError('Debe de ingresar la clave'));
      return false;
    }
    dispatch(removeError());
    return true;
  }

  return (
    <>
      <section className="section section-home">
        <div className="box-home">
            <span className="border-text" >COMPROMISO, EXPERIENCIA E INNOVACIÓN</span>
        </div>
        <div className="box-home box-home-2">
          <span>
          EL TRABAJO EN EQUIPO, EL COMPROMISO Y LA PASIÓN POR LO QUE HACEMOS SON LA CLAVE DEL ÉXITO DE TODOS LOS DÍAS.
          </span>
        </div>
      </section>
      <section className="section">
        <div className="call-to-action-2">
          <div className="container">
            <div className="sexteen-columns">
              <h6>
                Este sitio le permite generar Facturas Electrónicas propias para gestionar el CAE a través de AFIP o InterFacturas (la red de facturas electrónicas de InterBanking).
              </h6>
            </div>
          </div>
        </div>
      </section>
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
                  placeholder="id.."
                  name="id"
                  autoComplete="off"
                  onChange={handleInputChange}
                  value={id} />
              </Col>
              <Col>
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="clave.."
                  name="clave"
                  onChange={handleInputChange}
                  value={clave} />
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
              {loading ? 'LOADING..' : 'LOGIN'}
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
                <Link to="/auth/register">
                  CREAR UNA NUEVA CUENTA
                </Link>
                <Link to="/auth/recover/userId">
                  ¿OLVIDÓ SU ID.id?
                </Link>
                <Link to="/auth/recover/password">
                  ¿OLVIDÓ SU clave?
                </Link>
                <Link to="/auth/">
                  ¿PROBLEMAS CON EL LOGIN?
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>

    </>
  )
}
