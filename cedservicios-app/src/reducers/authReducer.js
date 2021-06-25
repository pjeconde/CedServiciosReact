import { types } from "../types/types";

const initialState = {
    id: 'asd123',
    name: 'German',
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name
            }

        case types.logout:
            return { ...state }

        default:
            return state;
    }
}