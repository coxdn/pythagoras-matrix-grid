import React from 'react'
import { connect } from 'react-redux'
import SelectSearch from 'react-select-search'
import { gridActions } from '../../_actions'

import '../../../css/select-search.css'


class PeoplesSearch extends React.Component {
    render() {
		return <SelectSearch
                    name="peoples"
                    multiple={true}
                    height={280}
                    options={this.props.peoples}
                    placeholder="Поиск..."
                    renderOption={renderFriend}
                    onChange={this.props.handleSelected}
                    onInputChange={this.props.onInputChange}
                    onInputKeyPress={this.props.onInputKeyPress}
                    autofocus={true}
                    fuse={{keys: ['name', 'date', 'tagSearch'], location: 0, threshold: 0.72, distance: 100, minMatchCharLength: 1}}
                />
    }
}

function renderFriend(option) {
    const photo = option.photo ? <img className="avatar" src={option.photo} /> : null
    const tag = option.tags ? option.tags.map((tag, i) => <span key={i}>{tag.value}</span>) : ''
    return (<span>{photo}<span>{option.name}</span><span>{option.date}</span><span>{tag}</span></span>)
}


const mapStateToProps = state => ({ peoples: state.peoples.items })

const connectedPeoplesSearch = connect(mapStateToProps)(PeoplesSearch)
export { connectedPeoplesSearch as PeoplesSearch }