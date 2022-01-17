import { types } from "../types/types";

const initialState = {
    solicitudesCuitGeneradas: [],
    solicitudesUnidadNegocioGeneradas: []
};

export const solicitudPermisoReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.solicitudPermisoSetCuitActivo:
            return {
                ...state,
                cuitActivo: action.payload
            };
        case types.solicitudPermisoRemoverCuitActivo:
            return {
                ...state,
                cuitActivo: null
            };
        case types.solicitudPermisoSetUnidadNegocioActivo:
            return {
                ...state,
                unidadNegocioActivo: action.payload
            };
        case types.solicitudPermisoRemoverUnidadNegocioActivo:
            return {
                ...state,
                unidadNegocioActivo: null
            };

        default:
            return state;
    }
}