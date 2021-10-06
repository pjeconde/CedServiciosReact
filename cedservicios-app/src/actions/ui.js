import { types } from '../types/types';

export const setError = (error) => ({
    type: types.uiSetError,
    payload: error
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

export const openModal = (nameModal, typeModal) => ({
    type: types.uiShowModal,
    payload: {
        nameModal,
        typeModal
    }
});

export const closeModal = () => ({
    type: types.uiCloseModal,
    payload: ''
});