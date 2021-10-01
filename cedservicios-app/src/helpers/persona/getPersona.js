import moment from "moment";
import { tipoDePersonas } from "../tipoPersona";


const getPersonaSinDto = (persona) => {
    try {
        let personaSinDto = { ...persona };

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

        delete personaSinDto.domicilio;
        delete personaSinDto.contacto;
        delete personaSinDto.datosIdentificatorios;
        delete personaSinDto.fechaInicioActividades;

        return {
            ...personaSinDto,
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
    }
    catch (error) {
        throw error;
    }
}

const getPersonaConDto = (persona) => {
    try {

        let {
            numeroDocumento,
            tipoPersona,
            tipoDocumento,
            provincia,
            condicionIva,
            condicionIngresoBruto,
            calle,
            numero,
            piso,
            departamento,
            sector,
            torre,
            manzana,
            localidad,
            codigoPostal,
            descripcion,
            razonSocial,
            nombre,
            email,
            telefono,
            gln,
            codigoInterno,
            numeroIngresoBruto,
            fechaInicioActividades
        } = persona;

        let domicilio = {
            calle,
            numero,
            piso,
            departamento,
            sector,
            torre,
            manzana,
            localidad,
            codigoPostal
        };
        let contacto = { nombre, email, telefono, };
        let datosIdentificatorios = { gln, codigoInterno };
        let esCliente = (tipoPersona.value === 2) ? true : (tipoPersona.value === 0) ? true : false;
        let esProveedor = (tipoPersona.value === 2) ? true : (tipoPersona.value === 1) ? true : false;

        return {
            numeroDocumento,
            descripcion,
            razonSocial,
            idTipoDocumento: tipoDocumento.value,
            idProvincia: provincia.value,
            idCondicionIva: condicionIva.value,
            idCondicionIngresoBruto: condicionIngresoBruto.value,
            domicilio,
            contacto,
            numeroIngresoBruto,
            datosIdentificatorios,
            fechaInicioActividades,
            esCliente,
            esProveedor
        };
    }
    catch (error) {
        throw error;
    }
}

export {
    getPersonaSinDto,
    getPersonaConDto
};