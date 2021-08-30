import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { startLogout } from '../../actions/auth';


export const DropdownUser = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div>
            <Dropdown
                align="end"
                drop="down"
                key="dropdownUserMenu"
                id="dropdownUser">
                <Dropdown.Toggle className="menu__user" variant="secondary" id="dropdownUserMenu" >
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
