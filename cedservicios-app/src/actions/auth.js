import Swal from 'sweetalert2';
import { instance as axios } from '../config/config';
import { types } from '../types/types';
import { startLoading, finishLoading, setError } from './ui';


export const startLogin = (IdUsuario, clave) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await axios.get('Usuario/Ingresar', {
                params: {
                    IdUsuario,
                    clave
                }
            });
            const { respuesta } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                dispatch(login({
                    uid: new Date().getTime(),
                    username: IdUsuario
                }));
            } else {
                dispatch(setError(respuesta.resultado.descripcion));
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

export const startRegister = (formValues) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await axios.post('Usuario/Registrar', { ...formValues });
            const { respuesta } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                dispatch(login({
                    id: formValues.id,
                    username: formValues.name
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

export const startLogout = () => {
    return async (dispatch) => {

    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

// const logout = () => ({
//     type: types.authLogout
// });

export const startCheckUserIdById = (id) => {
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

export const startCheckUserIdByEmail = (email) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await axios.get('Usuario/ConsultarIdUsuarioPorEmail', {
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

export const startCheckQuestion = (id, email) => {
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
                dispatch(setQuestion(valor));
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

export const startCheckAnswer = (id, email, answer) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const { question: pregunta } = getState().auth;
            const resp = await axios.get('Usuario/ValidarRespuestaPreguntaDeSeguridad', {
                params: {
                    id,
                    email,
                    pregunta,
                    respuesta: answer
                }
            });
            const { respuesta, valor } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                dispatch(setValidAnswer(valor));
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

const setQuestion = (question) => ({
    type: types.authSetQuestion,
    payload: question
});

const setValidAnswer = (validAnswer) => ({
    type: types.authSetValidAnswer,
    payload: validAnswer
});

export const startChangePassword = (idUsuario, email, answer, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());

            const { question: pregunta } = getState().auth;

            const resp = await axios.post('Usuario/CambiarClaveConPreguntaSeg', {
                idUsuario,
                email,
                pregunta,
                respuesta: answer,
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

export const startChecking = () => {
    return (dispatch) => {
        const pepe = true;
        //Aca deberiamos renovar el token
        // localStorage.setItem('token', token);
        // localStorage.setItem('token-init-date', new Date().getTime());

        if (pepe)
            dispatch(login({
                uid: new Date().getTime(),
                name: 'gmontiel'
            }));
        else
            dispatch(checkingFinish());
    }
}

export const startRemoveQuestionAndAnswer = () => {
    return (dispatch) => {
        dispatch(removeQuestion());
        dispatch(removeValidAnswer());
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const removeQuestion = () => ({
    type: types.authRemoveQuestion
});

const removeValidAnswer = () => ({
    type: types.authRemoveValidAnswer
});