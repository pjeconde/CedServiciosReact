import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Menu } from '../components/dashboardPrivate/Menu';
import { AltaCuitScreen } from '../views/AltaCuitScreen';
import { PersonaScreen } from '../views/PersonaScreen';

export const DashboardPrivate = () => {
    return (
        <div>
            <Menu />

            <main className="bg-light">
                <Switch>
                    <Route exact path="/persona" component={PersonaScreen} />
                    
                    <Route path="/admin/cuit" component={AltaCuitScreen} />

                    <Redirect to="/persona" />
                </Switch>
            </main>
        </div>
    )
}
