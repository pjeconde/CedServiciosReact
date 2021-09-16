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
    type: types.personaAgregarPersona,
    payload: persona
});

export const setPersonaActiva = (persona) => ({
    type: types.personaSetPersonaActiva,
    payload: persona
});

export const removerPersonaActiva = () => ({ type: types.personaRemoverPersonaActiva });

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
    type: types.personaActualizarPersona,
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

const eliminarPersona = () => ({ type: types.personaEliminarPersona });

export const agregarFiltro = (filtro) => ({
    type: types.personaAgregarFiltro,
    payload: filtro
});

export const removerFiltro = (filtro) => ({
    type: types.personaRemoverFiltro,
    payload: filtro
});

export const removerLosFiltros = () => ({ type: types.personaRemoverLosFiltro });