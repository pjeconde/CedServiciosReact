import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DashboardPublic } from './DashboardPublic';
import { DashboardPrivate } from './DashboardPrivate';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startChecking } from '../actions/auth';
import { Loading } from '../components/ui/Loading';

export const AppRouter = () => {

    const { checking, uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if (checking) {
        return <Loading />
    }

    return (
        <Router>
            <Switch>
                <PublicRoute
                    path="/auth"
                    isAuthenticated={!!uid}
                    component={DashboardPublic} />

                <PrivateRoute
                    path="/"
                    isAuthenticated={!!uid}
                    component={DashboardPrivate} />

                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
