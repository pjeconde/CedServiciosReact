import { types } from "../types/types";

const initialState = {
    solicitudesCuitGeneradas: [],
    solicitudesUnidadNegocioGeneradas: []
};

export const solicitudPermisoReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.solicitudPermisoCargarSolicitudesCuitGeneradas:
            return {
                ...state,
                solicitudesCuitGeneradas: action.payload
            };
        case types.solicitudPermisoCargarSolicitudesUnidadNegocioGeneradas:
            return {
                ...state,
                solicitudesUnidadNegocioGeneradas: action.payload
            };
        case types.solicitudPermisoRemoverTodo:
            return {
                ...initialState
            };
        default:
            return state;
    }
}