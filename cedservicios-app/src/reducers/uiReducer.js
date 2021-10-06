import { types } from '../types/types';

const initialState = {
    loading: false,
    errores: null,
    showModal: false,
    typeModal: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                errores: action.payload
            };
        case types.uiRemoveError:
            return {
                ...state,
                errores: null
            };
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            };
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            };

        case types.uiShowModal:
            return {
                ...state,
                showModal: action.payload.nameModal,
                typeModal: action.payload.typeModal
            };
        case types.uiCloseModal:
            return {
                ...state,
                showModal: action.payload,
                typeModal: null
            };
        default:
            return state;
    }
}