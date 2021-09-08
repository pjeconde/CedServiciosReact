import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Menu } from '../components/dashboardPublic/Menu';
import { RecuperarIdUsuarioScreen } from '../views/RecuperarIdUsuarioScreen';
import { IngresarScreen } from '../views/IngresarScreen';
import { RegistrarScreen } from '../views/RegistrarScreen';
import { CambiarPasswordScreen } from '../views/CambiarPasswordScreen';
import { HomeScreen } from '../views/HomeScreen';


export const DashboardPublic = () => {
    return (
        <>
            <Menu />

            <main>

                <Switch>
                    <Route exact path="/auth" component={HomeScreen} />
                    <Route exact path="/auth/login" component={IngresarScreen} />
                    <Route exact path="/auth/register" component={RegistrarScreen} />
                    <Route exact path="/auth/recover/userId" component={RecuperarIdUsuarioScreen} />
                    <Route exact path="/auth/recover/password" component={CambiarPasswordScreen} />

                    <Redirect to="/auth" />
                </Switch>

            </main>

        </>
    )
}
