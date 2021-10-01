import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    Navbar,
    NavDropdown,
    Nav
} from 'react-bootstrap';

import consultaSesionJSON from '../../data-static/usuario/consultarSesion.json';
import { DropdownUsuario } from './DropdownUsuario';

const menu = consultaSesionJSON[0].sesion.menu;


export const Menu = () => {


    return (
        <header className="bg-dark container-fluid header__menu" >
            <div className="container-fluid">
                <Navbar
                    collapseOnSelect
                    expand="lg"
                    bg="dark"
                    variant="dark">
                    <Link className="logo navbar-brand me-5" to="./">
                        <img src={`${process.env.PUBLIC_URL}/assets/logo-white.png`} alt="Cedeira Software Factory" />
                    </Link>
                    <Navbar.Toggle className="" aria-controls="menuPrivate" />
                    <Navbar.Collapse id="menuPrivate">
                        <div className="navbar-nav me-auto">
                            {
                                menu.map(({ nombre, habilitada, menu, url }) => (
                                    menu.length === 0
                                        ?
                                        <NavLink
                                            key={nombre}
                                            activeClassName="active"
                                            className="nav-item nav-link"
                                            disabled={!habilitada}
                                            to={url}>
                                            {nombre.toUpperCase().trim()}
                                        </NavLink>
                                        :
                                        <NavDropdown
                                            key={nombre}
                                            id={nombre}
                                            drop="end"
                                            variant="secondary"
                                            menuVariant="dark"
                                            title={nombre.toString().trim().toUpperCase()}
                                            disabled={!habilitada}>
                                            {
                                                menu.map(({ nombre, url, habilitada }) => (
                                                    ((
                                                        <NavDropdown.Item
                                                            key={nombre}
                                                            disabled={!habilitada}
                                                            href={url}>
                                                            {nombre}
                                                        </NavDropdown.Item>
                                                    ))
                                                ))
                                            }
                                        </NavDropdown>
                                ))
                            }
                        </div>
                        <Nav className="ms-auto">
                            <DropdownUsuario />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}
