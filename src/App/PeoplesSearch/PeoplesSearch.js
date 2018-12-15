import React from 'react'
import { connect } from 'react-redux'
import SelectSearch from 'react-select-search'
import { layoutActions } from '../../_actions'

class PeoplesSearch extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    
    handleChange = (value, state, props) => {
        console.log('--- handleChange', value, state, props)
        const id = state.clicked
        const content = this.props.peoples.filter(item => item.value==id)[0]
        this.props.dispatch(layoutActions.addSelected(content))
    }

    render() {
        console.log('--- peoples.items', this.props.peoples)
		return (
                <SelectSearch
                    name="friends"
                    multiple={true}
                    height={280}
                    options={/*friends*/ this.props.peoples}
                    placeholder="Поиск..."
                    renderOption={renderFriend}
                    onChange={this.handleChange}
                    autofocus={true}
                    fuse={{keys: ['name', 'date', 'tagSearch'], location: 0, threshold: 0.23, distance: 100, minMatchCharLength: 1}}
                />

			)
    }
}

function renderFriend(option) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10
    }
    const photo = option.photo ? <img style={imgStyle} width="40" height="40" src={option.photo} /> : null
    // console.log(' ==== tags', option.tags)
    const tag = option.tags ? option.tags.map(tag => tag.value).join(', ') : ''
    // const tag = ''
    return (<span>{photo}<span>{option.name}</span><span style={{'display': 'block'}}>{option.date}</span><span>{tag}</span></span>)
}

const mapStateToProps = state => {
    const {items: peoples} = state.peoples
    return {
        peoples
    }
}

const connectedPeoplesSearch = connect(mapStateToProps)(PeoplesSearch)
export { connectedPeoplesSearch as PeoplesSearch }