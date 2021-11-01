import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { iniciarIngresarUsuario } from '../actions/auth';
import { Informacion } from '../components/dashboardPublic/Informacion';
import { RegimeGeneral } from '../components/dashboardPublic/RegimeGeneral';
import { camelCase } from '../helpers/camelCase';
import { removeError, removeRedirect } from '../actions/ui';

export const IngresarScreen = () => {

  const dispatch = useDispatch();

  const { errores, loading } = useSelector(state => state.ui);
  const {
    values: formValues,
    handleInputChange,
    errors: formErrors,
    setErrors } = useForm({
      nombreUsuario: 'gmontiel',
      clave: 'asdasd'
    });
  const { nombreUsuario, clave } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(iniciarIngresarUsuario(nombreUsuario, clave));
  }

  useEffect(() => {
    return () => {
      dispatch(removeError());
      dispatch(removeRedirect());
    }
  }, [dispatch])

  useEffect(() => {
    if (errores) {
      let err = {};
      Object.keys(errores).map((key) => err[camelCase(key)] = errores[key][0]);
      setErrors(err);
    }
  }, [errores, setErrors])

  return (
    <div>
      <section className="auth__section bg-center-fixed">
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start">
              <h1 className="display-4 fw-bold lh-1 mb-3">Facturación Electrónica</h1>
              <p className="col-lg-10 fs-4">
                Este sitio le permite generar Facturas Electrónicas propias para gestionar el CAE a través de AFIP o InterFacturas (la red de facturas electrónicas de InterBanking).
              </p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
              <form onSubmit={handleLogin} className="p-4 p-md-5 border rounded-3 bg-light">
                <div className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    id="nombreUsuario"
                    name="nombreUsuario"
                    isInvalid={!!formErrors.nombreUsuario}
                    value={nombreUsuario}
                    onChange={handleInputChange} />
                  <label htmlFor="nombreUsuario">Nombre de usuario</label>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.nombreUsuario}
                  </Form.Control.Feedback>
                </div>
                <div className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="clave"
                    name="clave"
                    isInvalid={!!formErrors.clave}
                    value={clave}
                    onChange={handleInputChange}
                    placeholder="Clave" />
                  <label htmlFor="clave">Clave</label>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.clave}
                  </Form.Control.Feedback>
                </div>
                <button
                  className="w-100 btn btn-lg btn-secondary"
                  type="submit"
                  disabled={loading}>
                  Ingresar
                </button>
                <hr className="my-4" />
                <div className="auth__enlaces">
                  <Link to="/auth/registrar" className="link">
                    Registrarse
                  </Link>
                  <Link to="/auth/recuperar/nombreUsuario" className="link">
                    ¿Olvidó su usuario?
                  </Link>
                  <Link to="/auth/recuperar/clave" className="link">
                    ¿Olvidó su clave?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Informacion />
      <RegimeGeneral />
    </div>
  )
}

