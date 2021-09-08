import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { iniciarSalirUsuario } from '../../actions/auth';


export const DropdownUsuario = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(iniciarSalirUsuario());
    }

    return (
        <div>
            <Dropdown
                align="end"
                drop="down"
                key="dropdownUsuarioMenu"
                id="dropdownUsuario">
                <Dropdown.Toggle className="menu__user" variant="secondary" id="dropdownUsuarioMenu" >
                    <i className="fas fa-user"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#">German Montiel</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Configuracion</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={handleLogout}>
                        Salir
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
