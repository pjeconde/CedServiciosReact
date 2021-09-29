import { types } from "../types/types";

export const setPaginaActual = (pagina) => ({
    type: types.grillaSetPaginaActual,
    payload: pagina
});

export const setRegistrosPorPagina = (registroPorPagina) => ({
    type: types.grillaSetRegistrosPorPagina,
    payload: registroPorPagina
});

export const setDatosGrilla = (totalRegistros) => ({
    type: types.grillaSetDatosGrilla,
    payload: totalRegistros
});