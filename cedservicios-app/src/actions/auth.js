import Swal from 'sweetalert2';
import queryString from 'query-string';
import { fetchSinToken } from '../config/fetch';
import { types } from '../types/types';
import { startLoading, finishLoading, setError, removeError, setRedirect } from './ui';


export const iniciarIngresarUsuario = (nombreUsuario, clave) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken('Usuario/Ingresar', { nombreUsuario, clave }, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                const {
                    nombreUsuario,
                    nombreCompleto,
                    email,
                    token,
                    fechaExpiracion } = body.datos;

                localStorage.setItem('token', token);
                localStorage.setItem('token-exp', fechaExpiracion);

                dispatch(ingresarUsuario({
                    nombreUsuario,
                    nombreCompleto,
                    email
                }));
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }
            dispatch(finishLoading());

        }
        catch (error) {
            dispatch(finishLoading());
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

export const iniciarRegistroUsuario = (usuario) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken('Usuario', usuario, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                Swal.fire({ icon: 'success', title: 'Usuario', text: 'Usuario creado exitosamente.' });
                dispatch(setRedirect('/auth/ingresar'));
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }
            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
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

export const iniciarValidarNombreUsuario = (nombreUsuario) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken(`Usuario/ValidarNombreUsuario?${queryString.stringify({ nombreUsuario })}`);
            const body = await resp.json();

            if (resp.status === 200) {
                if (body.datos) {
                    Swal.fire('Nombre Usuario', 'Nombre de usuario disponible.', 'success');
                    dispatch(removeError());
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El Nombre de usuario no está disponible.'
                    });
                    dispatch(setError({ nombreUsuario: 'El Nombre de usuario no está disponible.' }));
                }
                dispatch(finishLoading());
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

        } catch (error) {
            console.log(error);
            dispatch(finishLoading());
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
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
                text: 'Ocurrió un error inesperado.'
            });
        }
    }
}

export const iniciarObtenerPreguntaSeguridad = (nombreUsuario, email) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const resp = await fetchSinToken(`Usuario/ObtenerPreguntaSeguridad?${queryString.stringify({ email, nombreUsuario })}`);
            const body = await resp.json();

            if (resp.status === 200) {
                const { formSeguridad } = getState().auth;
                dispatch(setFormSeguridad({
                    ...formSeguridad,
                    pregunta: body.datos,
                    nombreUsuario,
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
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

export const iniciarValidarRespuestaSeguridad = (respuesta) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const { formSeguridad } = getState().auth;
            const { nombreUsuario, pregunta } = formSeguridad;

            const resp = await fetchSinToken(`Usuario/ValidarRespuestaSeguridad?${queryString.stringify({
                nombreUsuario,
                pregunta,
                respuesta
            })}`);
            const body = await resp.json();

            if (resp.status === 200) {
                dispatch(setFormSeguridad({
                    ...formSeguridad,
                    respuestaValida: body.datos,
                    respuesta
                }));
                if (!body)
                    Swal.fire({ icon: 'error', title: 'Oops...', text: 'La respuesta no es válida.' });
            }
            else {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.errors[0].detail });
                dispatch(setError(body.errors[0].detail));
                dispatch(setFormSeguridad({ ...formSeguridad, respuestaValida: false, respuesta }));
            }
            dispatch(finishLoading());
        }
        catch (error) {
            console.log(error);
            dispatch(finishLoading());
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
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
            const { nombreUsuario, respuesta } = formSeguridad;

            const resp = await fetchSinToken(`Usuario/ActualizarClavePorNombreUsuario`, {
                nombreUsuario,
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
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
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
                nombreUsuario: ''
            }));
        else
            dispatch(finalizarComprobacion());
    }
}

const finalizarComprobacion = () => ({ type: types.authFinalizarComprobacion });

export const iniciarVerificacionEmail = (encriptacion) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            
            const resp = await fetchSinToken(`Usuario/ValidarVerificacionMailUsuario?autenticacion=${encriptacion}`);
            const body = await resp.json();

            if (resp.status === 200) {
                Swal.fire({ icon: 'success', title: 'Verificacion de email', text: 'Verificacion de email exitosa.' });
                dispatch(setRedirect('/auth/ingresar'));
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

        } catch (error) {
            dispatch(finishLoading());
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(setRedirect('/auth/ingresar'));
        }
    }
}