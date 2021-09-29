
const getFieldsByStatus = (status) => ({
    numeroDocumento: status,
    tipoPersona: status,
    tipoDocumento: status,
    descripcion: status,
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
    nombre: status,
    email: status,
    telefono: status,
    numeroIngresoBruto: status,
    fechaInicioActividades: status,
    gln: status,
    codigoInterno: status,
    provincia: status,
    condicionIva: status,
    condicionIngresoBruto: status,
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
                descripcion: false
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
