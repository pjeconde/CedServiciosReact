import Swal from "sweetalert2";
import { types } from "../types/types";
import { fetchConToken } from "../config/fetch";
import { parsearAPuntoVentaDto, parsearForm } from "../helpers/puntoVenta/parsearForm";
import { iniciarObtenerCuits } from "./cuit";
import { closeModal, finishLoading, setError, startLoading } from "./ui";

export const iniciarAgregarPuntoVenta = (puntoVenta) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            let puntoVentaDto = parsearAPuntoVentaDto(puntoVenta);

            const resp = await fetchConToken('PuntoVenta', puntoVentaDto, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                Swal.fire('Success', 'Punto de Venta agregado con exito.', 'success');
                dispatch(iniciarObtenerCuits());
                dispatch(closeModal());
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

            dispatch(finishLoading());
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(finishLoading());
        }
    }
}

export const iniciarSetPuntoVentaActivo = (puntoVenta) => {
    return (dispatch) => {
        try {
            let newPuntoVenta = parsearForm(puntoVenta);
            dispatch(setPuntoVentaActivo(newPuntoVenta));

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const setPuntoVentaActivo = (puntoVenta) => ({
    type: types.cuitSetPuntoVentaActivo,
    payload: puntoVenta
});

export const removerPuntoVentaActivo = () => ({ type: types.cuitRemoverPuntoVentaActivo });

export const iniciarActualizarPuntoVenta = (puntoVenta) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const puntoVentaDto = parsearAPuntoVentaDto(puntoVenta);

            const resp = await fetchConToken('PuntoVenta', puntoVentaDto, 'PUT');
            const body = await resp.json();

            if (body.datos) {
                Swal.fire('Success', 'Punto de Venta actualizado con exito.', 'success');
                dispatch(iniciarObtenerCuits());
                dispatch(closeModal());
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
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