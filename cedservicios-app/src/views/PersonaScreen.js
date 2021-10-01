import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import { BadgeStatus } from '../components/ui/BadgeStatus';
import { Expanded } from '../components/ui/Expanded';
// import { InputFilter } from '../components/ui/InputFilter';
import { ModalFiltro } from '../components/dashboardPrivate/persona/ModalFiltro';

import { ButtonActualizar } from '../components/ui/personas/ButtonActualizar';
import { ModalPersona } from '../components/dashboardPrivate/persona/ModalPersona';
import { ButtonAgregar } from '../components/ui/personas/ButtonAgregar';
import { ButtonDetalle } from '../components/ui/personas/ButtonDetalle';
import { ButtonEliminar } from '../components/ui/personas/ButtonEliminar';
import { ModalEliminar } from '../components/dashboardPrivate/persona/ModalEliminar';
import { FiltroAplicados } from '../components/ui/FiltroAplicados';
import { iniciarObtenerPersonas, removerFiltro, removerLosFiltros } from '../actions/persona';
import { setPaginaActual, setRegistrosPorPagina } from '../actions/grilla';

export const PaginationOptions = { rowsPerPageText: 'Filas por pagina' };


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
            // textTransform: 'uppercase',
        },
    },
}

const columnaPersonas = [
    {
        name: 'Nº Documento',
        selector: 'numeroDocumento',
        style: {
            color: '#202124',
            fontSize: '14px',
            fontWeight: 700,
        }
    },
    {
        name: 'Tipo documento',
        selector: 'tipoDocumento',
        cell: row => row.tipoDocumento?.descripcion,
    },
    {
        name: 'Razon social',
        selector: 'razonSocial',
        sortable: true,
        grow: 2
    },
    {
        name: 'Localidad',
        selector: 'domicilio.localidad',
        sortable: true
    },
    {
        name: 'Nombre contacto',
        selector: 'contacto.nombre',
        grow: 1.5,
        sortable: true
    },
    {
        name: 'Email',
        selector: 'contacto.email',
        grow: 2
    },
    {
        name: 'Estado',
        selector: 'estado',
        cell: row => <BadgeStatus status={row.estado.id === 1} text={row.estado.descripcion} />,
        center: true,
        grow: .5
    },
    {
        name: 'Detalle',
        cell: row => <ButtonDetalle persona={row} />,
        center: true,
        grow: .5
    },
    {
        name: 'Modificar',
        cell: row => <ButtonActualizar persona={row} />,
        center: true,
        grow: .5
    },
    {
        name: 'Eliminar',
        cell: row => <ButtonEliminar persona={row} />,
        center: true,
        grow: .5
    }
];

export const PersonaScreen = () => {

    const dispatch = useDispatch();
    const { personas, filtro } = useSelector(state => state.persona);
    const { loading } = useSelector(state => state.ui);
    const { cuentaTotal } = useSelector(state => state.grilla);
    // const [filterText, setFilterText] = useState('');

    // const handleOnChangeFilterText = (value) => {
    //     setFilterText(value);
    // }

    const handleEliminarFiltro = (f) => {
        let filtros = Object.entries(filtro).filter(([k, v], i) => !!v);

        if (filtros.length === 1) {
            handleEliminarFiltros();
        }
        else {
            dispatch(removerFiltro(f));
        }
    }

    const handleEliminarFiltros = () => {
        dispatch(removerLosFiltros());
        dispatch(iniciarObtenerPersonas());
    }

    const handleCambiarPagina = (pagina) => {
        dispatch(setPaginaActual(pagina));
        dispatch(iniciarObtenerPersonas());
    }

    const handleFilasPorPagina = (filas) => {
        dispatch(setRegistrosPorPagina(filas));
        dispatch(iniciarObtenerPersonas());
    }

    useEffect(() => {
        if (filtro) {
            dispatch(iniciarObtenerPersonas());
        }
    }, [filtro, dispatch])

    useEffect(() => {
        dispatch(iniciarObtenerPersonas());
    }, [dispatch])

    return (
        <div>
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper my-3">
                        <div className="header__title">
                            <h1>Personas</h1>
                        </div>
                        <div className="header__toolbar">

                            <ButtonAgregar />

                            <ModalFiltro />

                            <ModalPersona />

                            <ModalEliminar />
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            {
                                filtro &&
                                (
                                    <FiltroAplicados
                                        filtros={Object.keys(filtro).map(
                                            (i) => ({ key: i, value: filtro[i]?.value ? filtro[i].label : filtro[i] })
                                        )}
                                        eliminarFiltro={handleEliminarFiltro}
                                        eliminarFiltros={handleEliminarFiltros} />
                                )
                            }
                            <div className="datatable">
                                <DataTable
                                    key="datatable-personas"
                                    keyField="id"
                                    columns={columnaPersonas}
                                    data={personas}
                                    progressPending={loading}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={cuentaTotal}
                                    paginationDefaultPage={1}
                                    paginationComponentOptions={PaginationOptions}
                                    onChangePage={handleCambiarPagina}
                                    onChangeRowsPerPage={handleFilasPorPagina}
                                    expandableRows={true}
                                    expandableRowsComponent={<Expanded />}
                                    customStyles={customStyles}
                                    striped
                                    responsive
                                    noHeader
                                    highlightOnHover
                                    // subHeader
                                    // subHeaderAlign="left"
                                    // subHeaderComponent={
                                    //     <InputFilter
                                    //         key={'busqueda-persona'}
                                    //         id={'buscar-persona'}
                                    //         onFilter={handleOnChangeFilterText}
                                    //         filterText={filterText} />}
                                    sortIcon={<i className="fas fa-chevron-down"></i>} />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
