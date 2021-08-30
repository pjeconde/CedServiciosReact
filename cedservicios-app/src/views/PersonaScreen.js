import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import { InputFilter } from '../components/ui/InputFilter';
import { columnaPersonas } from '../helpers/columnaPersonas';
import Personas from '../data-static/persona/personas.json';

export const PaginationOptions = { rowsPerPageText: 'Filas por pagina' };

export const PersonaScreen = () => {

    const [filterText, setFilterText] = useState('');

    const handleOnChangeFilterText = (value) => {
        setFilterText(value);
    }

    return (
        <div>
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper my-3">
                        <div className="header__title">
                            <h1>Personas</h1>
                        </div>
                        <div className="header__toolbar">
                            <button type="button" className="btn btn-secondary">
                                <i className="fas fa-plus"></i>
                                Agregar
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                                <i className="fas fa-filter"></i>
                                Filtrar
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="datatable">
                                <DataTable
                                    key="datatable-personas"
                                    keyField="cuit"
                                    columns={columnaPersonas}
                                    data={Personas}
                                    pagination
                                    paginationTotalRows={50}
                                    paginationComponentOptions={PaginationOptions}
                                    striped
                                    responsive
                                    noHeader
                                    highlightOnHover
                                    subHeader
                                    subHeaderAlign="left"
                                    subHeaderComponent={
                                        <InputFilter
                                            key={'busqueda-persona'}
                                            id={'buscar-persona'}
                                            onFilter={handleOnChangeFilterText}
                                            filterText={filterText} />}
                                    sortIcon={<i className="fas fa-chevron-down"></i>} />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
