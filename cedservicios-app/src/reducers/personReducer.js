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
    personaActiva: null
};

export const personaReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.personaAgregada:
            return {
                ...state,
                personas: [...state.personas, action.payload]
            };
        case types.personaSetActiva:
            return {
                ...state,
                personaActiva: action.payload
            };
        case types.personaRemoverActiva:
            return {
                ...state,
                personaActiva: null
            };
        case types.personaActualizada:
            return {
                ...state,
                personas: state.personas.map(
                    p => (p.nroDocumento === action.payload.nroDocumento) ? action.payload : p
                )
            };
        case types.personaEliminada:
            return {
                ...state,
                personas: state.personas.filter(
                    p => (p.numeroDocumento !== state.personaActiva.numeroDocumento)
                ),
                personaActiva: null
            };
        default:
            return state;
    }
}