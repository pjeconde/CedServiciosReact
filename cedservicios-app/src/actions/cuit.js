import queryString from 'query-string';
import Swal from 'sweetalert2';
import { types } from "../types/types";
import { fetchConToken } from "../config/fetch";
import { closeModal, finishLoading, setError, startLoading } from "./ui";
import { setDatosGrilla } from './grilla';
import { parsearACuitDto, parsearAGrillaCuitDto, parsearCombobox } from '../helpers/cuit/parsearDto';

export const iniciarObtenerCuits = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            const { paginaActual: numeroPagina, registrosPorPagina } = getState().grilla;

            const resp = await fetchConToken(`Cuit/ObtenerPorPermiso?${queryString.stringify({
                numeroPagina,
                registrosPorPagina
            })}`);
            const body = await resp.json();

            if (resp.status === 200) {
                let { meta, datos } = body;
                dispatch(cargarCuits(datos));
                dispatch(setDatosGrilla(meta));
            }
            else {
                dispatch(cargarCuits([]));
            }

            dispatch(finishLoading());

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(finishLoading());
        }
    }
}

const cargarCuits = (cuits) => ({
    type: types.cuitCargarCuits,
    payload: cuits
});

export const iniciarSetCuitActivo = (cuit) => {
    return (dispatch) => {
        try {
            let cuitSinDto = parsearCombobox(cuit);
            dispatch(setCuitActivo(cuitSinDto));
        }
        catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const setCuitActivo = (cuit) => ({
    type: types.cuitSetCuitActivo,
    payload: cuit
});

export const removerCuitActivo = () => ({ type: types.cuitRemoverCuitActivo });

export const iniciarAgregarCuit = (cuit) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            let cuitDto = parsearACuitDto(cuit);
            const resp = await fetchConToken('Cuit', { ...cuitDto }, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                dispatch(finishLoading());
                dispatch(iniciarObtenerCuits());
                Swal.fire('Success', 'Cuit agregado con exito.', 'success');
                dispatch(closeModal());
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
                dispatch(finishLoading());
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

export const iniciarActualizarCuit = (cuit) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const cuitDto = parsearACuitDto(cuit);

            const resp = await fetchConToken('Cuit', cuitDto, 'PUT');
            const body = await resp.json();

            if (body.datos) {
                let grillaCuitDto = parsearAGrillaCuitDto(cuit);
                dispatch(finishLoading());
                dispatch(actualizarCuit(grillaCuitDto));
                dispatch(iniciarObtenerCuits());
                Swal.fire('Success', 'Cuit actualizado con exito.', 'success');
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
                dispatch(finishLoading());
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

            dispatch(finishLoading());
        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const actualizarCuit = (cuit) => ({
    type: types.cuitActualizarCuit,
    payload: cuit
});

export const iniciarEliminarCuit = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            let { cuitActivo } = getState().cuit;
            let id = cuitActivo.id;

            const resp = await fetchConToken(`Cuit/${id}`, null, 'DELETE');
            const body = await resp.json();

            if (body.datos) {
                dispatch(finishLoading());
                dispatch(eliminarCuit());
                dispatch(iniciarObtenerCuits());
                Swal.fire('Success', 'Cuit de baja con exito.', 'success');
            }
            else {
                Swal.fire('Error', 'No se pudo eliminar el cuit.', 'error');
            }
            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const eliminarCuit = () => ({ type: types.cuitEliminarCuit });