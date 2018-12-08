import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NoCompactingLayout from "../GridLayout/11-no-vertical-compact.js"
import ExampleLayout from "../GridLayout/test-hook.js"
import SelectSearch from 'react-select-search'
import { userActions } from '../_actions'
import '../../node_modules/react-select-search/style.css'

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getCurrent());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }



    render() {
        const { user, users } = this.props;
        console.log('this.props', this.props);
         // col-md-offset-3
        return (
            <div className="col-md-6">

                <SelectSearch
                    name="friends"
                    multiple={true}
                    height={280}
                    options={friends}
                    placeholder="Поиск..."
                    renderOption={renderFriend}
                    onChange={handleChange}
                    stopPropagation={true}
                    autofocus={true}
                    renderGroupHeader={handleGroupHeader}
                    fuse={{keys: ['name'], threshold: 0.3}}
                />


                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.username}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <div id="layout">
                    <ExampleLayout Layout={NoCompactingLayout} />
                </div>
            </div>
        );
    }
}

const friends = [
    {name: 'Annie Cruz', value: 'annie.cruz', photo: 'https://randomuser.me/api/portraits/women/60.jpg'},
    {name: 'Eli Shelton', value: 'eli.shelton', photo: 'https://randomuser.me/api/portraits/men/7.jpg'},
    {name: 'Loretta Rogers', value: 'loretta.rogers', photo: 'https://randomuser.me/api/portraits/women/51.jpg'},
    {name: 'Lloyd Fisher', value: 'lloyd.fisher', photo: 'https://randomuser.me/api/portraits/men/34.jpg'},
    {name: 'Tiffany Gonzales', value: 'tiffany.gonzales', photo: 'https://randomuser.me/api/portraits/women/71.jpg'},
]

function handleGroupHeader(name) {
    console.log('--- name', name)
}

function handleChange(value, state, props) {
    console.log('--- handleRenderValue', value, state, props)

    return [value[0]]
}

function renderFriend(option) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10
    }

    return (<span><img style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>)
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };