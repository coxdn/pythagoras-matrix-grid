import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, dispatch, loggedIn, loaded, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			const { pathname } = props.location
			return (
				!loaded ||
				(pathname === '/login' && !loggedIn) ||
				(pathname === '/app.html' && loggedIn)
			)
				? <Component {...props} dispatch={dispatch} />
				: <Redirect to={{ pathname: !loggedIn ? '/login' : '/app.html', state: { from: props.location } }} />
		}}
	/>
)