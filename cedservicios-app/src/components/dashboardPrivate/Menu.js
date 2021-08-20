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
                bg="light"
                expand="lg"
                fixed="top"
                sticky="top"
                collapseOnSelect>
                <div className="logo">
                    <Link to="./">
                        <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Cedeira Software Factory" />
                    </Link>
                </div>
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
                    </Nav>
                    <Nav className="mr-auto" style={{ margin: 'auto' }}>
                        <Button variant="danger">
                            <i className="fas fa-sign-out-alt"></i>
                            Salir
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="border-bottom" ></div>
        </header>
    )
}
