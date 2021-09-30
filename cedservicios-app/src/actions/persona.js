import queryString from 'query-string';
import Swal from 'sweetalert2';
import { fetchConToken } from "../config/fetch";
import { getPersonaConDto, getPersonaSinDto } from '../helpers/persona/getPersona';
import { types } from "../types/types";
import { setDatosGrilla } from './grilla';
import { finishLoading, setError, startLoading } from "./ui";


export const iniciarAgregarPersona = (persona) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            let personaConDto = getPersonaConDto(persona);
            const { cuit } = getState().auth;

            const resp = await fetchConToken('Persona', { ...personaConDto, cuit }, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                dispatch(finishLoading());
                Swal.fire('Success', 'Persona agregada con exito.', 'success');
                iniciarObtenerPersonas();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: body.errors[0].detail
                });
                dispatch(setError(body.errors[0].detail));
            }

        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
        }
    }
}

// const agregarPersona = (persona) => ({
//     type: types.personaAgregarPersona,
//     payload: persona
// });

export const iniciarSetPersonaActiva = (persona) => {
    return (dispatch) => {
        try {
            let personaSinDto = getPersonaSinDto(persona);
            dispatch(setPersonaActiva(personaSinDto));
        }
        catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
        }
    }
}

const setPersonaActiva = (persona) => ({
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

export const iniciarObtenerPersonas = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            const { paginaActual: numeroPagina, registrosPorPagina } = getState().grilla;
            const { filtro } = getState().persona;

            const resp = await fetchConToken(`Persona?${queryString.stringify(
                {
                    numeroDocumento: filtro?.numeroDocumento,
                    idEstado: filtro?.estado?.value,
                    razonSocial: filtro?.razonSocial,
                    numeroPagina,
                    registrosPorPagina
                })}`);
            const body = await resp.json();

            if (resp.status === 200) {
                let { meta, datos } = body;
                dispatch(cargarPersonas(datos));
                dispatch(setDatosGrilla(meta));
            }
            else {
                dispatch(cargarPersonas([]));
            }

            dispatch(finishLoading());
        }
        catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
            dispatch(finishLoading());
        }
    }
}

const cargarPersonas = (personas) => ({
    type: types.personaCargarPersonas,
    payload: personas
})