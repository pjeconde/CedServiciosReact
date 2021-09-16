import { types } from '../types/types';
import DatoPersonas from '../data-static/persona/personas.json';

/*
const initialState = {
    persons: Personas,
    activePerson: null
};
*/

const initialState = {
    personas: DatoPersonas,
    personaActiva: null,
    filtro: null
};

export const personaReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.personaAgregarPersona:
            return {
                ...state,
                personas: [...state.personas, action.payload]
            };
        case types.personaSetPersonaActiva:
            return {
                ...state,
                personaActiva: action.payload
            };
        case types.personaRemoverPersonaActiva:
            return {
                ...state,
                personaActiva: null
            };
        case types.personaActualizarPersona:
            return {
                ...state,
                personas: state.personas.map(
                    p => (p.numeroDocumento === action.payload.numeroDocumento) ? action.payload : p
                )
            };
        case types.personaEliminarPersona:
            return {
                ...state,
                personas: state.personas.filter(
                    p => (p.numeroDocumento !== state.personaActiva.numeroDocumento)
                ),
                personaActiva: null
            };
        case types.personaAgregarFiltro:
            return {
                ...state,
                filtro: { ...state.filtro, ...action.payload }
            };
        case types.personaRemoverFiltro:
            return {
                ...state,
                filtro: { ...state.filtro, [action.payload]: '' }
            };
        case types.personaRemoverLosFiltro:
            return {
                ...state,
                filtro: null
            };
        default:
            return state;
    }
}