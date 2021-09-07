import { types } from '../types/types';
import Personas from '../data-static/persona/personas.json';

const initialState = {
    persons: Personas,
    activePerson: null
};

export const personReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.personAddNew:
            return {
                ...state,
                persons: [...state.persons, action.payload]
                // activePerson: action.payload
            };
        case types.personSetActive:
            return {
                ...state,
                activePerson: action.payload
            };
        case types.personClearActive:
            return {
                ...state,
                activePerson: null
            };
        case types.personUpdated:
            return {
                ...state,
                persons: state.persons.map(
                    p => (p.nroDocumento === action.payload.nroDocumento) ? action.payload : p
                )
            };
        default:
            return state;
    }
}