import moment from 'moment';
import queryString from 'query-string';
import Swal from 'sweetalert2';
import { fetchConToken } from "../config/fetch";
import { tipoDePersonas } from '../helpers/tipoPersona';
import { types } from "../types/types";
import { setDatosGrilla } from './grilla';
import { finishLoading, startLoading } from "./ui";


export const iniciarAgregarPersona = (persona) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('Persona', persona, 'POST');
            const body = await resp.json();

            console.log(body);
            if (resp.status === 200) {
                iniciarObtenerPersonas();
            }

            // dispatch(agregarPersona(persona));

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error inesperado.'
            });
        }

    }
}

const agregarPersona = (persona) => ({
    type: types.personaAgregarPersona,
    payload: persona
});

export const setPersonaActiva = (persona) => {
    let objPersona = { ...persona };

    let { tipoDocumento,
        condicionIva,
        condicionIngresoBruto,
        provincia,
        fechaInicioActividades,
        esCliente,
        esProveedor,
        domicilio,
        contacto,
        datosIdentificatorios
    } = persona;

    delete objPersona.domicilio;
    delete objPersona.contacto;
    delete objPersona.datosIdentificatorios;
    delete objPersona.fechaInicioActividades;

    let newPersona = {
        ...objPersona,
        ...domicilio,
        ...contacto,
        ...datosIdentificatorios,
        tipoDocumento: { value: tipoDocumento.id, label: tipoDocumento.descripcion },
        condicionIva: { value: condicionIva.id, label: condicionIva.descripcion },
        condicionIngresoBruto: { value: condicionIngresoBruto.id, label: condicionIngresoBruto.descripcion },
        provincia: { value: provincia.id, label: provincia.descripcion },
        fechaInicioActividades: moment(fechaInicioActividades).format("YYYY-MM-DD"),
        tipoPersona: (esCliente && esProveedor) ? tipoDePersonas[2] : (esCliente) ? tipoDePersonas[0] : tipoDePersonas[1]
    };

    return {
        type: types.personaSetPersonaActiva,
        payload: newPersona
    }
};

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

            const resp = await fetchConToken(`Persona?${queryString.stringify({ numeroPagina, registrosPorPagina })}`);
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