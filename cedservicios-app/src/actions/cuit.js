import queryString from 'query-string';
import Swal from 'sweetalert2';
import { types } from "../types/types";
import { fetchConToken } from "../config/fetch";
import { finishLoading, startLoading } from "./ui";
import { setDatosGrilla } from './grilla';
import { parsearCombobox } from '../helpers/cuit/parsearDto'

export const iniciarObtenerCuits = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            const { paginaActual: numeroPagina, registrosPorPagina } = getState().grilla;

            const resp = await fetchConToken(`Cuit?${queryString.stringify({
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
            console.log(cuitSinDto);
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