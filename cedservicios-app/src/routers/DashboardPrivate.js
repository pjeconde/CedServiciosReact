import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Menu } from '../components/dashboardPrivate/Menu';
import { AltaCuitScreen } from '../views/AltaCuitScreen';

export const DashboardPrivate = () => {
    return (
        <>
            <Menu />

            <main style={{ height: '1200px' }}>
                <Switch>
                    <Route path="/admin/cuit/alta" component={AltaCuitScreen} />

                    <Redirect to="/admin/cuit/alta" />
                </Switch>
            </main>
        </>
    )
}
