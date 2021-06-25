import Swal from 'sweetalert2';
import { instance as axios } from '../config/config';
import { types } from '../types/types';
import { startLoading, finishLoading, setError } from './ui';


export const startLogin = (id, clave) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await axios.get('Usuario/Ingresar', {
                params: {
                    id,
                    clave
                }
            });
            const { respuesta } = resp.data[0];

            if (resp.status === 200 && respuesta.resultado.severidad === 0) {
                dispatch(login({
                    id,
                    name: 'Nombre de usuario'
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

            const resp = await axios.post('Usuario/Registrar',
                { ...formValues }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                }
            });
            console.log(resp)
            const { resultado } = resp.data[0];

            if (resp.status === 200 && resultado.severidad === 0) {
                dispatch(login({
                    id: formValues.id,
                    name: formValues.name
                }));
            } else {
                dispatch(setError(resultado.descripcion));
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

export const login = (user) => ({
    type: types.login,
    payload: user
});

export const logout = () => ({
    type: types.logout
});

export const startCheckUserIdByEmail = (email) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const resp = await axios.get('Usuario/ConsultarIdUsuarioPorEmail', {
                params: email
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