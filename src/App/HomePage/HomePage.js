import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NoCompactingLayout, InfoWrapperLayout } from "../GridLayout"
import { PeoplesSearch } from "../PeoplesSearch"
import { userActions } from '../../_actions'
import '../../../node_modules/react-select-search/style.css'

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getCurrent())
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id))
    }

    render() {
        const { user, users } = this.props
        console.log('this.props', this.props)
         // col-md-offset-3
        return (
            <div className="col-md-6">
                <PeoplesSearch />
                <div id="layout">
                    <InfoWrapperLayout Layout={NoCompactingLayout} />
                </div>
            </div>
        )

                // <h1>Hi {user.firstName}!</h1>
                // <p>You're logged in with React!!</p>
                // <h3>All registered users:</h3>
                // {users.loading && <em>Loading users...</em>}
                // {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                // {users.items &&
                //     <ul>
                //         {users.items.map((user, index) =>
                //             <li key={user.id}>
                //                 {user.username}
                //                 {
                //                     user.deleting ? <em> - Deleting...</em>
                //                     : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                //                     : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                //                 }
                //             </li>
                //         )}
                //     </ul>
                // }
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state
    const { user } = authentication
    return {
        user,
        users
    }
}

const connectedHomePage = connect(mapStateToProps)(HomePage)
export { connectedHomePage as HomePage }