import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    Button,
    Navbar,
    Nav,
    NavDropdown
} from 'react-bootstrap';

import consultaSesionJSON from '../../data-static/usuario/consultarSesion.json';

const menu = consultaSesionJSON[0].sesion.menu;


export const Menu = () => {

    return (
        <header >
            <Navbar
                bg="ligth"
                expand="lg"
                fixed="top"
                sticky="top"
                collapseOnSelect>
                <Link
                    to="/auth/register">
                    <img
                        style={{
                            width: '190px',
                            height: 'auto'
                        }}
                        src={`${process.env.PUBLIC_URL}/assets/logo.png`}
                        alt="Cedeira" />
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse style={{ justifyContent: 'flex-end', marginLeft: '20px' }}>
                    <Nav className="me-auto">
                        {
                            menu.map(({ nombre, habilitada, menu }) => (
                                <NavDropdown
                                    key={nombre}
                                    title={nombre.toString().trim().toUpperCase()}
                                    disabled={!habilitada} >
                                    {
                                        menu.map(({ nombre, url, habilitada, menu }) => (
                                            menu?.length > 0
                                                ?
                                                ((
                                                    <NavDropdown
                                                        key={nombre}
                                                        className={"nav-item dropdown"}
                                                        disabled={!habilitada}
                                                        title={nombre.toString()}>
                                                        {
                                                            menu.map(({ nombre, habilitada, url }) => (
                                                                <NavLink
                                                                    key={nombre}
                                                                    activeClassName="active"
                                                                    className="dropdown-item"
                                                                    disabled={!habilitada}
                                                                    to={url}>
                                                                    {nombre}
                                                                </NavLink>
                                                            ))
                                                        }
                                                    </NavDropdown>
                                                ))
                                                :
                                                ((
                                                    <NavLink
                                                        key={nombre}
                                                        activeClassName="active"
                                                        className="dropdown-item"
                                                        disabled={!habilitada}
                                                        to={url}>
                                                        {nombre}
                                                    </NavLink>
                                                ))
                                        ))
                                    }
                                </NavDropdown>
                            ))
                        }
                        {/* <NavDropdown id="dropdown-personas" title="PERSONAS" >
                            <NavDropdown.Item href="./">Alta</NavDropdown.Item>
                            <NavDropdown.Item href="./">Baja</NavDropdown.Item>
                            <NavDropdown.Item href="./">Modificación</NavDropdown.Item>
                            <NavDropdown.Item href="./">Consulta</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="ARTICULOS">
                            <NavDropdown.Item href="./">Alta</NavDropdown.Item>
                            <NavDropdown.Item href="./">Baja</NavDropdown.Item>
                            <NavDropdown.Item href="./">Modificación</NavDropdown.Item>
                            <NavDropdown.Item href="./">Consulta</NavDropdown.Item>
                            <NavDropdown title="Lista de Precios">
                                <NavDropdown.Item href="./">Alta</NavDropdown.Item>
                                <NavDropdown.Item href="./">Baja</NavDropdown.Item>
                                <NavDropdown.Item href="./">Modificación</NavDropdown.Item>
                                <NavDropdown.Item href="./">Clonado</NavDropdown.Item>
                                <NavDropdown.Item href="./">Remplazo</NavDropdown.Item>
                                <NavDropdown.Item href="./">Consulta</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Precios">
                                <NavDropdown.Item href="./">Ingreso Manual</NavDropdown.Item>
                                <NavDropdown.Item href="./">Importar de Excel</NavDropdown.Item>
                            </NavDropdown>
                        </NavDropdown>
                        <NavDropdown title="COMPROBANTES">
                            <NavDropdown.Item href="./">Baja</NavDropdown.Item>
                            <NavDropdown.Item href="./">Modificación</NavDropdown.Item>
                            <NavDropdown.Item href="./">Envio (AFIP/ITF)</NavDropdown.Item>
                            <NavDropdown.Item href="./">Consulta</NavDropdown.Item>
                            <NavDropdown.Item href="./">Consulta PDFs</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown title="Otras Consultas">
                                <NavDropdown.Item href="./">IVA Ventas</NavDropdown.Item>
                                <NavDropdown.Item href="./">IVA Compras</NavDropdown.Item>
                                <NavDropdown.Item href="./">Interfaz CITI Ventas/Compras</NavDropdown.Item>
                                <NavDropdown.Item href="./">Ventas por Articulo</NavDropdown.Item>
                                <NavDropdown.Item href="./">Compras por Articulo</NavDropdown.Item>
                                <NavDropdown.Item href="./">Stock por Articulo</NavDropdown.Item>
                                <NavDropdown.Item href="./">Online Interfacturas Comprobantes</NavDropdown.Item>
                                <NavDropdown.Item href="./">Online AFIP</NavDropdown.Item>
                                <NavDropdown.Item href="./">Archivo XML</NavDropdown.Item>
                                <NavDropdown.Item href="./">Terminos y Condiciones</NavDropdown.Item>
                            </NavDropdown>
                        </NavDropdown>
                        <NavDropdown title="CONTRATOS">
                            <NavDropdown.Item href="./">Alta</NavDropdown.Item>
                            <NavDropdown.Item href="./">Baja</NavDropdown.Item>
                            <NavDropdown.Item href="./">Modificación</NavDropdown.Item>
                            <NavDropdown.Item href="./">Consulta</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="FACTURACION">
                            <NavDropdown.Item href="./">Común / RG.2904 / BonoFiscal / Expo</NavDropdown.Item>
                            <NavDropdown.Item href="./">Turismo</NavDropdown.Item>
                            <NavDropdown.Item href="./">Automática de Contratos/Servicios</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown title="Registro de Facturas">
                                <NavDropdown.Item href="./">Venta Resguardo</NavDropdown.Item>
                                <NavDropdown.Item href="./">Compra</NavDropdown.Item>
                            </NavDropdown>
                        </NavDropdown>
                        <NavDropdown title="ADMIN">
                            <NavDropdown.Item href="./">CUIT</NavDropdown.Item>
                            <NavDropdown.Item href="./">UNs</NavDropdown.Item>
                            <NavDropdown.Item href="./">Puntos de Venta</NavDropdown.Item>
                            <NavDropdown.Item href="./">Autorizaciones</NavDropdown.Item>
                            <NavDropdown.Item href="./">Usuarios</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="ADMIN-SITE">
                            <NavDropdown.Item href="./">Comprobantes</NavDropdown.Item>
                            <NavDropdown.Item href="./">Usuarios</NavDropdown.Item>
                            <NavDropdown.Item href="./">CUITs</NavDropdown.Item>
                            <NavDropdown.Item href="./">UNs</NavDropdown.Item>
                            <NavDropdown.Item href="./">Puntos de Venta</NavDropdown.Item>
                            <NavDropdown.Item href="./">Personas</NavDropdown.Item>
                            <NavDropdown.Item href="./">Articulos</NavDropdown.Item>
                            <NavDropdown.Item href="./">Permisos</NavDropdown.Item>
                            <NavDropdown.Item href="./">Configuraciones</NavDropdown.Item>
                            <NavDropdown.Item href="./">Logs</NavDropdown.Item>
                            <NavDropdown.Item href="./">Administración</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="./">Búsqueda Laboral</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="AYUDA">
                            <NavDropdown.Item href="./">Manual</NavDropdown.Item>
                            <NavDropdown.Item href="./">Novedades</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav className="mr-auto" style={{ margin: 'auto' }}>
                        <Button variant="danger">
                            <i className="fas fa-sign-out-alt"></i>
                            Salir
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
