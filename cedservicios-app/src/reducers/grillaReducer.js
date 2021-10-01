import { types } from "../types/types";

const grillaInicial = {
    cuentaTotal: null,
    registrosPorPagina: 10,
    paginaActual: 1,
    paginasTotales: null,
    tienePaginaProxima: false,
    tienePaginaPrevia: false
};

export const grillaReducer = (state = grillaInicial, action) => {

    switch (action.type) {
        case types.grillaSetPaginaActual:
            return {
                ...state,
                paginaActual: action.payload
            };
        case types.grillaSetRegistrosPorPagina:
            return {
                ...state,
                registrosPorPagina: action.payload
            };
        case types.grillaSetDatosGrilla:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}