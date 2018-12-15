import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, dispatch, ...rest }) => {
	return (
	    <Route {...rest} render={props => {
	    	console.log('--- PrivateRoute render=', dispatch)
	    	return (
		        localStorage.getItem('user')
		            ? <Component {...props} dispatch={dispatch} />
		            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
			    )
		    }
	    } />

	)
}