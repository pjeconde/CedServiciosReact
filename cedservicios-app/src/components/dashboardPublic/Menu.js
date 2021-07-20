import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavDropdown
} from 'react-bootstrap';

export const Menu = () => {
    return (
        <div>
            <header>
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
                    <Navbar.Collapse style={{ justifyContent: 'flex-end', marginRight: '20px' }}>
                        <Nav className="mr-auto">
                            <NavLink
                                activeClassName="active"
                                className="nav-item nav-link"
                                to="./auth/about">QUIÉNES SOMOS</NavLink>
                            <NavDropdown title="SERVICIOS">
                                <NavDropdown.Item href="./">DESARROLLOS A MEDIDA</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./">SOFTWARE FACTORY</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./">FACTURA ELECTRONICA</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./">PERSONAL IT</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="PRODUCTOS">
                                <NavDropdown.Item href="./">DESARROLLOS A MEDIDA</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./">SOFTWARE FACTORY</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./">FACTURA ELECTRONICA</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./">PERSONAL IT</NavDropdown.Item>
                            </NavDropdown>
                            <NavLink
                                activeClassName="active"
                                className="nav-item nav-link"
                                to="/auth/tech">
                                TECNOLOGÍA
                            </NavLink>
                            <NavLink
                                activeClassName="active"
                                className="nav-item nav-link"
                                to="/auth/login">
                                INGRESAR
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </div>
    )
}
