import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../views/LoginScreen';
import { RegisterScreen } from '../views/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/auth/login" component={LoginScreen} />

                <Route exact path="/auth/register" component={RegisterScreen} />

                <Redirect to="/auth/login" />
            </Switch>
        </div>
    )
}
