import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Menu } from '../components/dashboardPublic/Menu';
import { LoginScreen } from '../views/LoginScreen';
import { RegisterScreen } from '../views/RegisterScreen';


export const DashboardPublic = () => {
    return (
        <>
            <Menu />

            {/* <div className="content" > */}
                <Switch>
                    <Route exact path="/auth/login" component={LoginScreen} />

                    <Route exact path="/auth/register" component={RegisterScreen} />

                    <Redirect to="/auth/login" />
                </Switch>

            {/* </div> */}
        </>
    )
}
