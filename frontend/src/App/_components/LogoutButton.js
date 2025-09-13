import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

class LogoutButton extends React.Component {
	render() {
		return (
			<div className="logout">
				<p>
					<Link to="/login" onClick={this.props.userLogout}>
						<button type="button" className="btn btn-primary btn-sm">
							<span className="glyphicon glyphicon-off" aria-hidden="true"></span> Выйти
						</button>
					</Link>
				</p>
			</div>
		)
	}
}

const connectedLogoutButton = connect(null, {
	userLogout: userActions.logout
})(LogoutButton)
export { connectedLogoutButton as LogoutButton }