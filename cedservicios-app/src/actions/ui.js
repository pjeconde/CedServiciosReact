import { types } from '../types/types';

export const setError = (msgError, label) => ({
    type: types.uiSetError,
    payload: {
        msgError,
        label
    }
});

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});