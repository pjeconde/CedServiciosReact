import { types } from "../types/types";

const initialState = {
    cuits: [],
    cuitActivo: null,
    filtro: null
}

export const cuitReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.cuitCargarCuits:
            return {
                ...state,
                cuits: [...action.payload]
            };
            
        default:
            return state;
    }

}