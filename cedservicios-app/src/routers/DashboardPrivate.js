import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Menu } from '../components/dashboardPrivate/Menu';
import { CuitScreen } from '../views/CuitScreen';
import { PersonaScreen } from '../views/PersonaScreen';

export const DashboardPrivate = () => {
    return (
        <div>
            <Menu />

            <main className="bg-light">

                <Switch>
                    <Route exact path="/persona" component={PersonaScreen} />
                    <Route exact path="/admin/cuit" component={CuitScreen} />

                    <Redirect to="/persona" />
                </Switch>

            </main>
        </div>
    )
}
