import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

class LogoutButton extends React.Component {
	render() {
		return (
			<div className="logout">
	            <p>
	                <Link to="/login" onClick={this.handleLogout}>
			          <button type="button" className="btn btn-primary btn-sm">
			            <span className="glyphicon glyphicon-off" aria-hidden="true"></span> Выйти
			          </button>
			        </Link>
	            </p>
	        </div>
		)
	}

	handleLogout = () => {
		this.props.dispatch(userActions.logout())
	}
}

const connectedLogoutButton = connect()(LogoutButton)
export { connectedLogoutButton as LogoutButton }