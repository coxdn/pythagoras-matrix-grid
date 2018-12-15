import React from 'react'

class SelectTags extends React.Component {

	componentWillReceiveProps(nextProps, nextState) {
		console.log('--- SelectTags.componentWillReceiveProps', this.props)
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log('--- SelectTags.shouldComponentUpdate')
		return true;
	}
	componentWillUpdate(nextProps) {
		console.log('--- SelectTags.componentWillUpdate', nextProps)
	}
	render() {
		console.log('--- SelectTags.render', this.props)
		return <div></div>
	}

}

export { SelectTags }