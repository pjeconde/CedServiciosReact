import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Menu } from '../components/dashboardPublic/Menu';
import { RecoverUserIdScreen } from '../views/RecoverUserIdScreen';
import { LoginScreen } from '../views/LoginScreen';
import { RegisterScreen } from '../views/RegisterScreen';
import { RecoverPasswordScreen } from '../views/RecoverPasswordScreen';


export const DashboardPublic = () => {
    return (
        <>
            <Menu />

            <main>
                <Switch>
                    <Route exact path="/auth/login" component={LoginScreen} />
                    <Route exact path="/auth/register" component={RegisterScreen} />
                    <Route exact path="/auth/recover/userId" component={RecoverUserIdScreen} />
                    <Route exact path="/auth/recover/password" component={RecoverPasswordScreen} />

                    <Redirect to="/auth/login" />
                </Switch>
            </main>

        </>
    )
}
