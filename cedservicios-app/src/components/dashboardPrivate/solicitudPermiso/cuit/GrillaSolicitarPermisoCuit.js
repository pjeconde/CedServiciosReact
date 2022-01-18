import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { ButtonSolicitar } from '../../../ui/ButtonSolicitar';
import { InputFilter } from '../../../ui/InputFilter';
import { ModalSolicitarPermisoCuit, nameModal } from './ModalSolicitarPermisoCuit';
import { openModal } from '../../../../actions/ui';
import { GrillaSolicitarPermisoUnidadNegocio } from '../unidadNegocio/GrillaSolicitarPermisoUnidadNegocio';
import { EmptyState } from '../../../ui/EmptyState';
import { iniciarObtenerCuitPorNumeroCuit, removerTodoCuit } from '../../../../actions/cuit';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 800,
        },
    },
}

export const GrillaSolicitarPermisoCuit = () => {

    const dispatch = useDispatch();
    const { cuits } = useSelector(state => state.cuit);
    const [filterText, setFilterText] = useState('');

    const columnaCuits = [
        {
            name: 'Cuit',
            selector: 'cuit',
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 700,
            }
        },
        {
            name: 'Razon social',
            selector: 'razonSocial',
            grow: 1
        },
        {
            name: 'Nombre contacto',
            selector: 'nombreContacto',
            grow: 1,
        },
        {
            name: 'Permisos',
            cell: row => <ButtonSolicitar row={row} handleOnClick={handleOnClickSolicitar} />,
            center: true,
            grow: .5
        },
    ];

    const handleOnChangeFilterText = (e) => {
        const re = /^[0-9\b]+$/;
        (e.target.value === '' || (re.test(e.target.value))) && setFilterText(e.target.value)
    };

    const handleOnClickSolicitar = () => {
        let typeModal = 'Solicitar';
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickBuscarCuit = useCallback(() => {
        if (filterText === '' || filterText.length < 11)
            Swal.fire({ title: 'Cuit', text: 'Por favor ingrese un Cuit.', icon: 'warning' });
        else {
            dispatch(removerTodoCuit());
            dispatch(iniciarObtenerCuitPorNumeroCuit(filterText));
        }
    }, [dispatch, filterText])

    const subHeaderComponent = useMemo(() => {
        return (
            <>
                <InputFilter
                    key='busqueda-solicitud-cuit'
                    id='buscar-solicitud-cuit'
                    className='buttons__border-radius-right'
                    maxLength="11"
                    onFilter={handleOnChangeFilterText}
                    filterText={filterText}
                    placeholder='Cuit...'
                />
                <Button
                    className='buttons__border-radius-left'
                    variant='secondary'
                    onClick={handleOnClickBuscarCuit}>
                    Buscar
                </Button>
            </>
        );
    }, [filterText, handleOnClickBuscarCuit]);

    return (
        <div >
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper my-3">
                        <div className="header__title mt-3">
                            <h2>Solicitar permiso para un Cuit o Unidad de Negocio</h2>
                        </div>
                        <div className="header__toolbar">
                            <ModalSolicitarPermisoCuit key="modal-solicitar-permiso-cuit" />
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div className="card">
                    <div className="card-body">
                        <div className="datatable">
                            <DataTable
                                key="datatable-solicitar-cuit"
                                keyField="id"
                                data={cuits}
                                columns={columnaCuits}
                                expandableRows
                                expandableRowExpanded={row => row.unidadesNegocio.length >= 0}
                                expandableRowsComponent={<GrillaSolicitarPermisoUnidadNegocio />}
                                noDataComponent={<EmptyState />}
                                customStyles={customStyles}
                                striped
                                responsive
                                noHeader
                                subHeader
                                subHeaderAlign="left"
                                subHeaderComponent={subHeaderComponent}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
