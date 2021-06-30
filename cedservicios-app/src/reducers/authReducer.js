import { types } from "../types/types";

const initialState = {
    id: new Date().getTime(),
    username: ''
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username
            };
        case types.authLogout:
            return {
                ...state
            };
        case types.authSetQuestion:
            return {
                ...state,
                question: action.payload
            };
        case types.authRemoveQuestion:
            return {
                ...state,
                question: null
            };
        case types.authSetValidAnswer:
            return {
                ...state,
                validAnswer: action.payload
            };
        case types.authRemoveValidAnswer:
            return {
                ...state,
                validAnswer: null
            };
        default:
            return state;
    }
}