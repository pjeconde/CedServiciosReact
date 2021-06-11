import axios from 'axios';
import { types } from '../types/types';
import { config } from '../config/config';
import { startLoading } from './ui';


export const startLogout = () => {
    return async (dispatch) => {
        // await firebase.auth().signOut();

        // dispatch(logout());

        // dispatch(noteLogout());

    }
}

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());
        
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then(({ user }) => {
        //         dispatch(finishLoading());
        //         dispatch(login(user.uid, user.displayName));
        //     }).catch(e => {
        //         dispatch(finishLoading());
        //         Swal.fire('Error', e.message, 'error');
        //     })
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

export const login = (id, displayName) => ({
    type: types.login,
    payload: {
        id,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
});