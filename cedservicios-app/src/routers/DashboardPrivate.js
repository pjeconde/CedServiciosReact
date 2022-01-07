import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Menu } from '../components/dashboardPrivate/Menu';
import { CuitScreen } from '../views/CuitScreen';
import { PersonaScreen } from '../views/PersonaScreen';
import { SolicitudPermisoScreen } from '../views/SolicitudPermisoScreen';

export const DashboardPrivate = () => {
    return (
        <>
            <Menu />

            <main className="bg-light" style={{ height: '100vh' }}>

                <Switch>
                    <Route exact path="/persona" component={PersonaScreen} />
                    <Route exact path="/admin/cuit" component={CuitScreen} />
                    <Route exact path="/admin/solicitudes" component={SolicitudPermisoScreen} />

                    <Redirect to="/persona" />
                </Switch>

            </main>
        </>
    )
}
