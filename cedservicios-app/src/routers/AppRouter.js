import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DashboardPublic } from './DashboardPublic';
import { DashboardPrivate } from './DashboardPrivate';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { iniciarComprobacion } from '../actions/auth';
import { Loading } from '../components/ui/Loading';

export const AppRouter = () => {

    const { comprobacion, nombreUsuario } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(iniciarComprobacion());
    }, [dispatch])

    if (comprobacion) {
        return <Loading />
    }

    return (
        <Router>
            <Switch>
                <PublicRoute
                    path="/auth"
                    isAuthenticated={!!nombreUsuario}
                    component={DashboardPublic} />

                <PrivateRoute
                    path="/"
                    isAuthenticated={!!nombreUsuario}
                    component={DashboardPrivate} />

                <Redirect to="/" />
            </Switch>
        </Router>
    )
}
