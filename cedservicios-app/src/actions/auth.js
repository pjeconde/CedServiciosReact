import Swal from 'sweetalert2';
import queryString from 'query-string';
import { fetchSinToken } from '../config/fetch';
import { types } from '../types/types';
import { startLoading, finishLoading, setError, removeError } from './ui';


export const iniciarIngresarUsuario = (nombreCuenta, clave) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken('Usuario/Ingresar', { nombreCuenta, clave }, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                const {
                    nombreCuenta,
                    nombreCompleto,
                    email,
                    token,
                    fechaExpiracion } = body;

                localStorage.setItem('token', token);
                localStorage.setItem('token-exp', fechaExpiracion);

                dispatch(ingresarUsuario({
                    nombreCuenta,
                    nombreCompleto,
                    email
                }));
            }
            else {
                dispatch(setError(body.errors[0].detail));
            }
            dispatch(finishLoading());

        }
        catch (error) {
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
        }
    }
}

export const iniciarRegistroUsuario = (formValues) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken('Usuario', formValues, 'POST');
            const body = await resp.json();

            if (resp.status === 201) {

                const {
                    nombreCuenta,
                    nombreCompleto,
                    email,
                    token,
                    fechaExpiracion } = body;

                localStorage.setItem('token', token);
                localStorage.setItem('token-exp', fechaExpiracion);

                dispatch(ingresarUsuario({
                    nombreCuenta,
                    nombreCompleto,
                    email
                }));
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: body.errors[0].detail
                });
                dispatch(setError(body.errors[0].detail));
            }
            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
        }
    }
}

export const iniciarSalirUsuario = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch(salirUsuario());
    }
}

const ingresarUsuario = (usuario) => ({
    type: types.authIngresarUsuario,
    payload: usuario
});

const salirUsuario = () => ({
    type: types.authSalirUsuario
});

export const iniciarValidarNombreCuenta = (nombreCuenta) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken(`Usuario/ValidarNombreCuenta?${queryString.stringify({ nombreCuenta })}`);
            const body = await resp.json();

            if (body) {
                Swal.fire('Nombre Cuenta', 'Nombre de cuenta disponible.', 'success');
                dispatch(removeError());
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El Nombre de cuenta no está disponible.'
                });
                dispatch(setError('El Nombre de cuenta no está disponible.', 'nombreCuenta'));
            }
            dispatch(finishLoading());

        } catch (error) {
            console.log(error);
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor contactese con el administrador'
            });
        }
    }
}

export const iniciarValidarIdUsuarioPorEmail = (email) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            // const resp = await axios.get('Usuario/ConsultarIdUsuarioPorEmail', {
            //     params: {
            //         email
            //     }
            // });
            // const { respuesta } = resp.data[0];

            // if (resp.status === 200 && respuesta.resultado.severidad === 0) {
            //     Swal.fire('Id Usuario', 'Id usuario recuperado exitosamente.', 'success');
            // } else {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: respuesta.resultado.descripcion
            //     });
            //     dispatch(setError(respuesta.resultado.descripcion));
            // }
            dispatch(finishLoading());

        } catch (error) {
            console.log(error);
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor contactese con el administrador'
            });
        }
    }
}

export const iniciarObtenerPreguntaSeguridad = (nombreCuenta, email) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken(`Usuario/ObtenerPreguntaSeguridad?${queryString.stringify({ email, nombreCuenta })}`);
            const body = await resp.json();

            if (resp.status === 200) {
                const { formSeguridad } = getState().auth;
                dispatch(setFormSeguridad({
                    ...formSeguridad,
                    pregunta: body,
                    nombreCuenta,
                    email
                }))
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: body.errors[0].detail
                });
                dispatch(setError(body.errors[0].detail));
            }

            dispatch(finishLoading());
        }
        catch (error) {
            console.log(error);
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
        }
    }
}

export const iniciarValidarRespuestaSeguridad = (respuesta) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const { formSeguridad } = getState().auth;
            const { nombreCuenta, pregunta } = formSeguridad;

            const resp = await fetchSinToken(`Usuario/ValidarRespuestaSeguridad?${queryString.stringify({
                nombreCuenta,
                pregunta,
                respuesta
            })}`);
            const body = await resp.json();

            if (resp.status === 200) {
                dispatch(setFormSeguridad({
                    ...formSeguridad,
                    respuestaValida: body,
                    respuesta
                }));
                if (!body)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La respuesta no es válida.'
                    });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: body.errors[0].detail
                });
                dispatch(setError(body.errors[0].detail));
                dispatch(setFormSeguridad({
                    ...formSeguridad,
                    respuestaValida: false,
                    respuesta
                }));
            }
            dispatch(finishLoading());
        }
        catch (error) {
            console.log(error);
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
        }
    }
}

export const setFormSeguridad = (formSeguridad) => ({
    type: types.authSetFormSeguridad,
    payload: formSeguridad
});

export const removerFormSeguridad = () => ({
    type: types.authRemoverFormSeguridad
});

export const iniciarCambiarContraseña = (password) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const { formSeguridad } = getState().auth;
            const { nombreCuenta, respuesta } = formSeguridad;

            const resp = await fetchSinToken(`Usuario/ActualizarClavePorNombreCuenta`, {
                nombreCuenta,
                respuesta,
                nuevaClave: password
            }, 'PUT');
            const body = await resp.json();

            if (resp.status === 200) {
                Swal.fire('Success', 'Cambio de contraseña exitoso.', 'success');
                dispatch(removerFormSeguridad());
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: body.errors[0].detail
                });
                dispatch(setError(body.errors[0].detail));
            }
            dispatch(finishLoading());

        } catch (error) {
            console.log(error);
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor contactese con el administrador'
            });
        }

    }
}

export const iniciarComprobacion = () => {
    return (dispatch) => {
        const pepe = true;
        //Aca deberiamos renovar el token
        // localStorage.setItem('token', token);
        // localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(finalizarComprobacion());

        if (pepe)
            dispatch(ingresarUsuario({
                idUsuario: new Date().getTime(),
                nombreCuenta: 'gmontiel'
            }));
        else
            dispatch(finalizarComprobacion());
    }
}

const finalizarComprobacion = () => ({ type: types.authFinalizarComprobacion });

