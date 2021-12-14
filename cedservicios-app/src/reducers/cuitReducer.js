import { types } from "../types/types";

const initialState = {
    cuits: [],
    unidadesDeNegocio: [],
    puntosDeVenta: [],
    cuitActivo: null,
    unidadNegocioActivo: null,
    puntoVentaActivo: null,
    filtro: null
}

export const cuitReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.cuitCargarCuits:
            return {
                ...state,
                cuits: [...action.payload]
            };
        case types.cuitAgregarCuit:
            return {
                ...state,
                cuits: [...state.cuits, action.payload]
            };
        case types.cuitSetCuitActivo:
            return {
                ...state,
                cuitActivo: action.payload
            };
        case types.cuitRemoverCuitActivo:
            return {
                ...state,
                cuitActivo: null
            };
        case types.cuitActualizarCuit:
            return {
                ...state,
                cuits: state.cuits.map(
                    c => (c.id === action.payload.id) ? action.payload : c
                )
            };
        case types.cuitEliminarCuit:
            return {
                ...state,
                cuits: state.cuits.filter(
                    c => (c.cuit !== state.cuitActivo.cuit)
                ),
                cuitActivo: null,
                unidadNegocioActivo: null,
                puntoVentaActivo: null
            };
        case types.cuitSetUnidadNegocioActivo:
            return {
                ...state,
                unidadNegocioActivo: action.payload
            };
        case types.cuitRemoverUnidadNegocioActivo:
            return {
                ...state,
                unidadNegocioActivo: null
            };
        case types.cuitSetPuntoVentaActivo:
            return {
                ...state,
                puntoVentaActivo: action.payload
            };
        case types.cuitRemoverPuntoVentaActivo:
            return {
                ...state,
                puntoVentaActivo: null
            };
        case types.cuitCargarUnidadesDeNegocio:
            return {
                ...state,
                unidadesDeNegocio: [...action.payload]
            };
        case types.cuitActualizarUnidadNegocio:
            return {
                ...state,
                unidadesDeNegocio: state.unidadesDeNegocio.map(
                    un => (un.id === action.payload.id) ? action.payload : un
                )
            };
        case types.cuitEliminarUnidadNegocio:
            return {
                ...state,
                unidadesDeNegocio: state.unidadesDeNegocio.filter(
                    un => (un.id !== state.unidadNegocioActivo.id)
                ),
                unidadNegocioActivo: null,
                puntoVentaActivo: null
            };
        default:
            return state;
    }

}