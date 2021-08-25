import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Menu } from '../components/dashboardPrivate/Menu';
import { AltaCuitScreen } from '../views/AltaCuitScreen';
import { PersonaScreen } from '../views/PersonaScreen';

export const DashboardPrivate = () => {
    return (
        <>
            <Menu />

            <main className="bg-light">
                <Switch>
                    <Route exact path="/persona" component={PersonaScreen} />

                    <Route path="/admin/cuit/alta" component={AltaCuitScreen} />

                    <Redirect to="/admin/cuit/alta" />
                </Switch>
            </main>
        </>
    )
}
