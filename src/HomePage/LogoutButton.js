import { Link } from 'react-router-dom';

function LogoutButton() {
	return (
		<div style={{'float': 'right'}}>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
		)
}
export { LogoutButton }