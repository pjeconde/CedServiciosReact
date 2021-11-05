import moment from "moment";

const parsearCombobox = (cuit) => {
    try {
        let cuitSinDto = { ...cuit };

        let {
            condicionIva,
            condicionIngresoBruto,
            provincia,
            fechaInicioActividades,
            medio
        } = cuit;

        delete cuitSinDto.fechaInicioActividades;

        return {
            ...cuitSinDto,
            condicionIva: { value: condicionIva.id, label: condicionIva.descripcion },
            condicionIngresoBruto: { value: condicionIngresoBruto.id, label: condicionIngresoBruto.descripcion },
            provincia: { value: provincia.id, label: provincia.descripcion },
            fechaInicioActividades: moment(fechaInicioActividades).format("YYYY-MM-DD"),
            medio: { value: medio.id, label: medio.descripcion },
        };
    }
    catch (error) {
        throw error;
    }
}

const parsearACuitDto = (cuit) => {
    try {
        let {
            condicionIva,
            condicionIngresoBruto,
            provincia,
            medio
        } = cuit;

        return {
            ...cuit,
            idCondicionIva: condicionIva.value,
            idCondicionIngresoBruto: condicionIngresoBruto.value,
            idProvincia: provincia.value,
            idMedio: medio.value
        }

    } catch (error) {
        throw error;
    }
}

const parsearAGrillaCuitDto = (cuit) => {
    try {
        let { condicionIva,
            condicionIngresoBruto,
            provincia,
            estado,
            medio
        } = cuit;

        return {
            ...cuit,
            condicionIva: { id: condicionIva.value, descripcion: condicionIva.label },
            condicionIngresoBruto: { id: condicionIngresoBruto.value, descripcion: condicionIngresoBruto.label },
            provincia: { id: provincia.value, descripcion: provincia.label },
            estado: { id: estado.value, descripcion: estado.label },
            medio: { id: medio.value, descripcion: medio.label },
        }

    } catch (error) {
        throw error;
    }
}

export {
    parsearCombobox,
    parsearACuitDto,
    parsearAGrillaCuitDto
};