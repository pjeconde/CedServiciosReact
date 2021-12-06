import moment from 'moment';

export const parsearForm = (puntoVenta) => {
    try {
        let newPuntoVenta = { ...puntoVenta };

        let {
            condicionIva,
            condicionIngresoBruto,
            provincia,
            fechaInicioActividades,
            tipoPuntoVenta
        } = puntoVenta;

        delete newPuntoVenta.fechaInicioActividades;

        return {
            ...newPuntoVenta,
            condicionIva: { value: condicionIva.id, label: condicionIva.descripcion },
            condicionIngresoBruto: { value: condicionIngresoBruto.id, label: condicionIngresoBruto.descripcion },
            provincia: { value: provincia.id, label: provincia.descripcion },
            fechaInicioActividades: moment(fechaInicioActividades).format("YYYY-MM-DD"),
            tipoPuntoVenta: { value: tipoPuntoVenta.id, label: tipoPuntoVenta.descripcion },
        };
    }
    catch (error) {
        throw error;
    }
}

export const parsearAPuntoVentaDto = (puntoVenta) => {
    try {
        let {
            condicionIva,
            condicionIngresoBruto,
            provincia,
            tipoPuntoVenta
        } = puntoVenta;

        return {
            ...puntoVenta,
            idCondicionIva: condicionIva.value,
            idCondicionIngresoBruto: condicionIngresoBruto.value,
            idProvincia: provincia.value,
            idTipoPuntoVenta: tipoPuntoVenta.value
        }

    } catch (error) {
        throw error;
    }

}