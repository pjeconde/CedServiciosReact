import { types } from "../types/types";


export const iniciarAgregarPersona = (persona) => {
    return (dispatch) => {

        try {
            //Conectamos con la Api
            dispatch(agregarPersona(persona));

        } catch (error) {
            console.error(error);
        }

    }
}

const agregarPersona = (persona) => ({
    type: types.personaAgregada,
    payload: persona
});

export const setPersonaActiva = (persona) => ({
    type: types.personaSetActiva,
    payload: persona
});

export const removerPersonaActiva = () => ({ type: types.personaRemoverActiva });

export const iniciarActualizarPersona = (person) => {

    return (dispatch) => {

        try {

            //Conectar con la api(PersonaController/Actualizar)
            dispatch(actualizarPersona(person));

        } catch (error) {
            console.error(error);
        }

    }

}

const actualizarPersona = (persona) => ({
    type: types.personaActualizada,
    payload: persona
})

export const iniciarEliminarPersona = () => {

    return (dispatch) => {
        try {

            //Conectar con la api
            dispatch(eliminarPersona());

        } catch (error) {
            console.error(error);
        }

    }
}

const eliminarPersona = () => ({ type: types.personaEliminada });