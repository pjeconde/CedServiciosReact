import { types } from "../types/types";

const initialState = {
    checking: true,
    uid: null,
    username: ''
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                uid: action.payload.uid,
                username: action.payload.username,
                checking: false
            };
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
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