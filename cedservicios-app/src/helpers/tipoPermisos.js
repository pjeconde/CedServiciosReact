export const TipoPermisos = {
    'Owner': 1,
    'Admin': 2,
    'FacturaElectronica': 3,
    'FacturaElectronicaConsulta': 4,
    'AdminSite': 5
}

//Verifica si existe el permiso de admin en general (AdminSite, Owner y Admin)
export const existePermisoDeAdmin = (permisos = []) => {
    let permiso = false;

    permisos.forEach(
        p => {
            if (p.id === TipoPermisos.AdminSite ||
                p.id === TipoPermisos.Owner ||
                p.id === TipoPermisos.Admin) {
                permiso = true;
            }
        });

    return permiso;
}