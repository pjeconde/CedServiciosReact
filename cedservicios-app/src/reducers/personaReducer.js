import { types } from '../types/types';

const initialState = {
    personas: [],
    personaActiva: null,
    filtro: null
};

export const personaReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.personaCargarPersonas:
            return {
                ...state,
                personas: [...action.payload]
            };
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