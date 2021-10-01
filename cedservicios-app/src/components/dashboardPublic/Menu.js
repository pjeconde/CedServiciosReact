import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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
                        to="/auth/ingresar"
                        className="nav-item nav-link link-secondary t-up"
                        exact
                        activeClassName="active">
                        ingresar
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}
