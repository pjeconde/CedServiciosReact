
const getFieldsByStatus = (status) => ({
    numeroPuntoVenta: status,
    tipoPuntoVenta: status,
    calle: status,
    numero: status,
    piso: status,
    departamento: status,
    sector: status,
    torre: status,
    manzana: status,
    localidad: status,
    codigoPostal: status,
    nombreContacto: status,
    emailContacto: status,
    telefonoContacto: status,
    numeroIngresoBruto: status,
    fechaInicioActividades: status,
    codigoInterno: status,
    provincia: status,
    condicionIva: status,
    condicionIngresoBruto: status,
});

export const getCamposHabilitados = (tipoModal) => {

    let formCuit = getFieldsByStatus(true);

    switch (tipoModal) {
        case 'Agregar':
            return {
                ...formCuit
            };
        case 'Actualizar':
            return {
                ...formCuit,
                numeroPuntoVenta: false,
                tipoPuntoVenta: false
            };
        case 'Detalle':
            formCuit = getFieldsByStatus(false);
            return {
                ...formCuit
            };
        case 'Eliminar':
            formCuit = getFieldsByStatus(false);
            return {
                ...formCuit
            };
        default:
            return formCuit;
    }
}
