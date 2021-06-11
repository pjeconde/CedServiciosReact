import { types } from "../types/types";

const initialState = {
    id: 'asd123',
    name: 'German',
    last_name: 'Montiel',
    email: 'gmontiel@gmail.com'
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                id: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return { ...state }

        default:
            return state;
    }
}