import moment from "moment";
import { tipoDePersonas } from "../tipoPersona";

// Transforma los combobox de persona en el objeto {value, label}
const parsearComboboxPersona = (persona) => {
    try {
        let personaSinDto = { ...persona };

        let { tipoDocumento,
            condicionIva,
            condicionIngresoBruto,
            provincia,
            fechaInicioActividades,
            esCliente,
            esProveedor,
        } = persona;

        delete personaSinDto.fechaInicioActividades;

        return {
            ...personaSinDto,
            tipoDocumento: { value: tipoDocumento.id, label: tipoDocumento.descripcion },
            condicionIva: { value: condicionIva.id, label: condicionIva.descripcion },
            condicionIngresoBruto: { value: condicionIngresoBruto.id, label: condicionIngresoBruto.descripcion },
            provincia: { value: provincia.id, label: provincia.descripcion },
            fechaInicioActividades: moment(fechaInicioActividades).format("YYYY-MM-DD"),
            tipoPersona: (esCliente && esProveedor) ? tipoDePersonas[2] : (esCliente) ? tipoDePersonas[0] : tipoDePersonas[1]
        };
    }
    catch (error) {
        throw error;
    }
}

// Transforma el formulario de persona a personaDto
const parsearAPersonaDto = (persona) => {
    try {
        let {
            tipoDocumento,
            condicionIva,
            condicionIngresoBruto,
            provincia,
            tipoPersona
        } = persona;

        let esCliente = (tipoPersona.value === 2) ? true : (tipoPersona.value === 0) ? true : false;
        let esProveedor = (tipoPersona.value === 2) ? true : (tipoPersona.value === 1) ? true : false;

        return {
            ...persona,
            esCliente,
            esProveedor,
            idCondicionIva: condicionIva.value,
            idTipoDocumento: tipoDocumento.value,
            idCondicionIngresoBruto: condicionIngresoBruto.value,
            idProvincia: provincia.value
        }

    } catch (error) {
        throw error;
    }
}

const parsearAGrillaPersonaDto = (persona) => {
    try {
        let { tipoDocumento,
            condicionIva,
            condicionIngresoBruto,
            provincia,
            estado,
            tipoPersona,
        } = persona;

        return {
            ...persona,
            tipoDocumento: { id: tipoDocumento.value, descripcion: tipoDocumento.label },
            condicionIva: { id: condicionIva.value, descripcion: condicionIva.label },
            condicionIngresoBruto: { id: condicionIngresoBruto.value, descripcion: condicionIngresoBruto.label },
            provincia: { id: provincia.value, descripcion: provincia.label },
            tipoPersona: { id: tipoPersona.value, descripcion: tipoPersona.label },
            estado: { id: estado.value, descripcion: estado.label },
        }

    } catch (error) {
        throw error;
    }
}

export {
    parsearComboboxPersona,
    parsearAPersonaDto,
    parsearAGrillaPersonaDto
};