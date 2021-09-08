
const getFieldsByStatus = (status) => ({
    numeroDocumento: status,
    tipoPersona: status,
    tipoDocumento: status,
    idPersona: status,
    razonSocial: status,
    calle: status,
    nro: status,
    piso: status,
    depto: status,
    sector: status,
    torre: status,
    manzana: status,
    localidad: status,
    codigoPostal: status,
    nombreContacto: status,
    email: status,
    telefono: status,
    numeroIngresoBrutos: status,
    dateStart: status,
    gln: status,
    codigoInterno: status,
    provincia: status,
    condicionIva: status,
    condicionIngresoBrutos: status,
});

export const getCamposHabilitados = (tipoModal) => {

    let formPersona = getFieldsByStatus(true);

    switch (tipoModal) {
        case 'Agregar':
            return {
                ...formPersona
            };
        case 'Actualizar':
            return {
                ...formPersona,
                tipoDocumento: false,
                numeroDocumento: false,
                idPersona: false
            };
        case 'Detalle':
            formPersona = getFieldsByStatus(false);
            return {
                ...formPersona
            };
        default:
            return formPersona;
    }
}
