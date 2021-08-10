import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../hooks/useForm';
import { startLogin } from '../actions/auth';
import { removeError, setError } from '../actions/ui';
import { Informacion } from '../components/dashboardPublic/Informacion';
import { RegimeGeneral } from '../components/dashboardPublic/RegimeGeneral';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { msgError, loading } = useSelector(state => state.ui);
  const { values: formValues, handleInputChange } = useForm({
    email: 'german_montiel96@hotmail.com',
    clave: 'Asd123.'
  })
  const { email, clave } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLogin(email, clave));
    }
  }

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Debe de ingresar un email.'));
      return false;
    }
    else if (!clave || clave.length < 5) {
      dispatch(setError('Debe de ingresar la clave.'));
      return false;
    }

    dispatch(removeError());
    return true;
  }

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
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email.." />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="clave"
                    value={clave}
                    onChange={handleInputChange}
                    placeholder="Password" />
                  <label htmlFor="password">Password</label>
                </div>
                {
                  msgError && (
                    <div className={`mb-3 ${(msgError) ? 'auth__invalid' : ''}`}>
                      {msgError}
                    </div>
                  )
                }
                <button
                  className="w-100 btn btn-lg btn-secondary"
                  type="submit"
                  disabled={loading}>
                  Ingresar
                </button>
                <hr className="my-4" />
                <div className="auth__enlaces">
                  <Link to="/auth/register" className="link">
                    Registrarse
                  </Link>
                  <Link to="/auth/recover/userId" className="link">
                    ¿Olvidó su usuario?
                  </Link>
                  <Link to="/auth/recover/password" className="link">
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

