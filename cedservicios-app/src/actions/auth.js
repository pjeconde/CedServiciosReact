import Swal from 'sweetalert2';
import { instance as axios } from '../config/config';
import { types } from '../types/types';
import { startLoading, finishLoading, setError } from './ui';


export const iniciarIngresarUsuario = (email, clave) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await axios.post('Usuario/Ingresar', { email, clave });

            if (resp.status === 200) {
                const { idUsuario, nombreCuenta, token, expiracion } = resp.data;

                localStorage.setItem('token', token);
                localStorage.setItem('token-exp', expiracion);

                dispatch(ingresarUsuario({
                    idUsuario,
                    nombreCuenta
                }));
            } else {
                dispatch(setError('Error al ingresar al sistema.'));
            }
            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor contactese con el administrador'
            });
        }
    }
}

export const iniciarRegistroUsuario = (formValues) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await axios.post('Usuario/Registrar', { ...formValues });
            const { respuesta } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                const { idUsuario, nombreCuenta } = formValues;
                dispatch(ingresarUsuario({
                    idUsuario,
                    nombreCuenta
                }));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: respuesta.resultado.descripcion
                });
                dispatch(setError(respuesta.resultado.descripcion));
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

export const iniciarSalirUsuario = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch(salirUsuario());
    }
}

const ingresarUsuario = (user) => ({
    type: types.authIngresarUsuario,
    payload: user
});

const salirUsuario = () => ({
    type: types.authSalirUsuario
});

export const iniciarValidarIdUsuarioPorId = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await axios.get('Usuario/ConsultarIdDisponible', {
                params: {
                    id
                }
            });
            const { valor } = resp.data[0];

            if (resp.status === 200 && valor) {
                Swal.fire('Id Usuario', 'Id usuario disponible.', 'success');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El Id Usuario no está disponible.'
                });
                dispatch(setError('El Id Usuario no está disponible'));
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
            dispatch(startLoading()); const resp = await axios.get('Usuario/ConsultarIdUsuarioPorEmail', {
                params: {
                    email
                }
            });
            const { respuesta } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                Swal.fire('Id Usuario', 'Id usuario recuperado exitosamente.', 'success');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: respuesta.resultado.descripcion
                });
                dispatch(setError(respuesta.resultado.descripcion));
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

export const iniciarValidarPreguntaSeguridad = (id, email) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await axios.get('Usuario/ConsultarPreguntaDeSeguridad', {
                params: {
                    id,
                    email
                }
            });
            const { respuesta, valor } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                dispatch(setPreguntaSeguridad(valor));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: respuesta.resultado.descripcion
                });
                dispatch(setError(respuesta.resultado.descripcion));
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

export const iniciarValidarRespuestaSeguridad = (id, email, respuestaSeguridad) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const { preguntaSeguridad: pregunta } = getState().auth;
            const resp = await axios.get('Usuario/ValidarRespuestaPreguntaDeSeguridad', {
                params: {
                    id,
                    email,
                    pregunta,
                    respuesta: respuestaSeguridad
                }
            });
            const { respuesta, valor } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                dispatch(setRespuestaSeguridad(valor));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: respuesta.resultado.descripcion
                });
                dispatch(setError(respuesta.resultado.descripcion));
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

const setPreguntaSeguridad = (preguntaSeguridad) => ({
    type: types.authSetPreguntaSeguridad,
    payload: preguntaSeguridad
});

const setRespuestaSeguridad = (respuestaSeguridad) => ({
    type: types.authSetRespuestaSeguridadValida,
    payload: respuestaSeguridad
});

export const iniciarCambiarContraseña = (idUsuario, email, respuestaSeguridad, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const { preguntaSeguridad: pregunta } = getState().auth;

            const resp = await axios.post('Usuario/CambiarClaveConPreguntaSeg', {
                idUsuario,
                email,
                pregunta,
                respuesta: respuestaSeguridad,
                claveNueva: password,
                claveNuevaConfirmacion: password
            });
            const { respuesta, valor } = resp.data[0];

            if (resp.status === 200 && valor) {
                Swal.fire('Success', 'Cambio de contraseña exitoso.', 'success');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: respuesta.resultado.descripcion
                });
                dispatch(setError(respuesta.resultado.descripcion));
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

export const iniciarRemoverPreguntaYRespuesta = () => {
    return (dispatch) => {
        dispatch(removerPreguntaSeguridad());
        dispatch(removerRespuestaSeguridad());
    }
}

const finalizarComprobacion = () => ({ type: types.authFinalizarComprobacion });

const removerPreguntaSeguridad = () => ({
    type: types.authRemoverPreguntaSeguridad
});

const removerRespuestaSeguridad = () => ({
    type: types.authRemoverRespuestaSeguridadValida
});