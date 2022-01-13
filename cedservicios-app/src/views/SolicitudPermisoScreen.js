import React from 'react';
import { GrillaSolicitarPermisoCuit } from '../components/dashboardPrivate/solicitudPermiso/cuit/GrillaSolicitarPermisoCuit';
import { GrillaSolicitudesCuit } from '../components/dashboardPrivate/solicitudPermiso/cuit/GrillaSolicitudesCuit';
import { GrillaSolicitudesUnidadNegocio } from '../components/dashboardPrivate/solicitudPermiso/unidadNegocio/GrillaSolicitudesUnidadNegocio';


export const SolicitudPermisoScreen = () => {

    return (
        <div className='container-xxl'>
            <div className='row pb-5'>

                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <GrillaSolicitarPermisoCuit key='grillaSolicitarPermisoCuit' />
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
