import { types } from '../types/types';

const initialState = {
    loading: false,
    msgError: null,
    label: null,
    showModal: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload.msgError,
                label: action.payload.label,
                showModal: false
            };
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null,
                label: null
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
                showModal: action.payload
            };
        case types.uiCloseModal:
            return {
                ...state,
                showModal: action.payload
            };
        default:
            return state;
    }
}