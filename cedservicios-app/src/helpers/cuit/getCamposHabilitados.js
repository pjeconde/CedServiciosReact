
const getFieldsByStatus = (status) => ({
    cuit: status,
    razonSocial: status,
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
    gln: status,
    codigoInterno: status,
    provincia: status,
    condicionIva: status,
    condicionIngresoBruto: status,
    medio: status,
    facturaElectronica: status,
    interfacturas: status,
    afip: status,
    certificadoPropio: status,
    numeroCertificado: status
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
                cuit: false,
            };
        case 'Detalle':
            formCuit = getFieldsByStatus(false);
            return {
                ...formCuit
            };
        default:
            return formCuit;
    }
}
