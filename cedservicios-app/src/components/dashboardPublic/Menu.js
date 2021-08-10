import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';

export const Menu = () => {
    return (
        <header>
            <nav className="menu-navegacion contenedor-menu">
                <div className="logo">
                    <Link to="./">
                        <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Cedeira Software Factory" />
                    </Link>
                </div>
                <ul className="nav">
                    <NavLink
                        to="./"
                        className="nav-item nav-link link-secondary t-up"
                        activeClassName="active">
                        quiénes somos
                    </NavLink>
                    <NavLink
                        to="./"
                        className="nav-item nav-link link-secondary t-up"
                        activeClassName="active">
                        servicios
                    </NavLink>
                    <NavLink
                        to="./"
                        className="nav-item nav-link link-secondary t-up"
                        activeClassName="active">
                        productos
                    </NavLink>
                    <NavLink
                        to="./"
                        className="nav-item nav-link link-secondary t-up"
                        activeClassName="active">
                        tecnología
                    </NavLink>
                    <NavLink
                        to="./"
                        className="nav-item nav-link link-secondary t-up"
                        activeClassName="active">
                        clientes
                    </NavLink>
                    <NavLink
                        to="./"
                        className="nav-item nav-link link-secondary t-up"
                        activeClassName="active">
                        contacto
                    </NavLink>
                    <NavLink
                        to="/auth/login"
                        className="nav-item nav-link link-secondary t-up"
                        exact
                        activeClassName="active">
                        ingresar
                    </NavLink>
                </ul>
            </nav>

            {/* <Navbar
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
            </Navbar> */}
        </header>
    )
}
