import { types } from '../types/types';
import { axiosConfig as axios } from '../config/config';
import { startLoading, finishLoading, setError } from './ui';


export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await axios.get('Usuario/Ingresar', {
                params: {
                    id: email,
                    password
                }
            });
            const { resultado } = resp.data[0];

            if (resp.status === 200 && resultado.severidad === 0) {
                dispatch(login({
                    id: email,
                    name: 'Username'
                }));
            } else {
                dispatch(setError(resultado.descripcion));
            }
            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            dispatch(setError('Por favor contactese con el administrador.'));
        }
    }
}

export const startRegisterWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then(async ({ user }) => {

        //         await user.updateProfile({ displayName: name });

        //         dispatch(login(user.uid, user.displayName));

        //     }).catch(e => {
        //         Swal.fire('Error', e.message, 'error');
        //     })
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