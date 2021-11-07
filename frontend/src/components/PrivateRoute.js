import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/auth';

function PrivateRoute({ component: Component, ...rest }) {
	const { authToken } = useAuth();
	return <Route {...rest} render={(props) => (authToken ? <Component {...props} /> : <Navigate to="/login" />)} />;
}

export default PrivateRoute;
