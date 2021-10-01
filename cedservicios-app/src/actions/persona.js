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
                dispatch(iniciarObtenerPersonas());
                Swal.fire('Success', 'Persona agregada con exito.', 'success');
            }
            else {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.errors[0].detail });
                dispatch(setError(body.errors[0].detail));
            }

        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
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
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const setPersonaActiva = (persona) => ({
    type: types.personaSetPersonaActiva,
    payload: persona
});

export const removerPersonaActiva = () => ({ type: types.personaRemoverPersonaActiva });

export const iniciarActualizarPersona = (persona) => {

    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const personaDto = getPersonaConDto(persona);
            let dtoSinRelaciones = { ...personaDto };
            delete dtoSinRelaciones.condicionIva;
            delete dtoSinRelaciones.tipoDocumento;
            delete dtoSinRelaciones.condicionIngresoBruto;
            delete dtoSinRelaciones.provincia;
            delete dtoSinRelaciones.estado;
            delete dtoSinRelaciones.tipoPersona;

            const resp = await fetchConToken('Persona', { id: persona.id, ...dtoSinRelaciones }, 'PUT');
            const body = await resp.json();
            console.log(body);

            if (body) {
                dispatch(finishLoading());
                dispatch(actualizarPersona({ id: persona.id, ...personaDto }));
                dispatch(iniciarObtenerPersonas());
                Swal.fire('Success', 'Persona actualizada con exito.', 'success');
            }
            else {
                Swal.fire('Error', 'No se pudo actualizar la persona.', 'error');
            }
        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const actualizarPersona = (persona) => ({
    type: types.personaActualizarPersona,
    payload: persona
})

export const iniciarEliminarPersona = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            let { personaActiva } = getState().persona;
            let id = personaActiva.id;

            const resp = await fetchConToken(`Persona/${id}`, null, 'DELETE');
            const body = await resp.json();

            if (body) {
                dispatch(finishLoading());
                dispatch(eliminarPersona());
                dispatch(iniciarObtenerPersonas());
                Swal.fire('Success', 'Persona de baja con exito.', 'success');
            }
            else {
                Swal.fire('Error', 'No se pudo eliminar la persona.', 'error');
            }

            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
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
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(finishLoading());
        }
    }
}

const cargarPersonas = (personas) => ({
    type: types.personaCargarPersonas,
    payload: personas
})