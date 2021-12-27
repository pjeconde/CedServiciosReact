import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Menu } from '../components/dashboardPublic/Menu';
import { RecuperarNombreUsuarioScreen } from '../views/RecuperarNombreUsuarioScreen';
import { IngresarScreen } from '../views/IngresarScreen';
import { RegistrarScreen } from '../views/RegistrarScreen';
import { CambiarPasswordScreen } from '../views/CambiarPasswordScreen';
// import { HomeScreen } from '../views/HomeScreen';
import { VerificacionEmailScreen } from '../views/VerificacionEmailScreen';


export const DashboardPublic = () => {
    return (
        <>
            <Menu />

            <main>

                <Switch>
                    {/* <Route exact path="/auth" component={HomeScreen} /> */}
                    <Route exact path="/auth/ingresar" component={IngresarScreen} />
                    <Route exact path="/auth/registrar" component={RegistrarScreen} />
                    <Route exact path="/auth/recuperar/nombreUsuario" component={RecuperarNombreUsuarioScreen} />
                    <Route exact path="/auth/recuperar/clave" component={CambiarPasswordScreen} />
                    <Route path="/auth/verificacion/:encriptado?" component={VerificacionEmailScreen} />

                    <Redirect to="/auth/ingresar" />
                </Switch>

            </main>

        </>
    )
}
