import React from 'react';
import { GrillaSolicitarPermiso } from '../components/dashboardPrivate/solicitudPermiso/GrillaSolicitarPermiso';
import { GrillaSolicitudesCuit } from '../components/dashboardPrivate/solicitudPermiso/GrillaSolicitudesCuit';
import { GrillaSolicitudesUnidadNegocio } from '../components/dashboardPrivate/solicitudPermiso/GrillaSolicitudesUnidadNegocio';


export const SolicitudPermisoScreen = () => {

    return (
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <GrillaSolicitarPermiso key='grillaSolicitarPermisos' />

                </div>
                <div className='col-sm-12 cold-md-12 col-lg-6 mt-5'>
                    <GrillaSolicitudesCuit key='grillaSolicitudesCuit' />
                </div>
                <div className='col-sm-12 cold-md-12 col-lg-6 mt-5'>
                    <GrillaSolicitudesUnidadNegocio key='grillaSolicitudesUnidadNegocio' />
                </div>

            </div>

        </div>
    )
}
