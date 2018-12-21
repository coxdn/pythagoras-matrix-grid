import React from 'react'
// import { connect } from 'react-redux'
import { Creatable } from 'react-select-plus'

import '../../../node_modules/react-select-plus/dist/react-select-plus.css'
import '../../../css/select-plus.css'

class SelectTags extends React.Component {
	// constructor(props) {
	// 	super(props)
	state = {
		multi: true,
		multiValue: [],
		options: []
	}
	// }

	handleOnChange = value => {
		// console.log('--- handleOnChange', value)
		this.props.onChangeTags(value)
		this.setState({ multiValue: value })
	}

	componentDidMount() {
		const { tags: multiValue } = this.props
        this.setState({ multiValue })
	}

	render() {
        const { multi, multiValue, options } = this.state
        // console.log('--- SelectTags.render', this.state)

		return <Creatable
				multi={multi}
				options={options}
				onChange={this.handleOnChange}
				value={multiValue}
				shouldKeyDownEventCreateNewOption={keyCode => keyCode==13}
				promptTextCreator={label => label}
				placeholder="Введите новые теги добавляя их нажатием Enter"
			/>
	}

}


// function mapStateToProps(state) {
// 	const { tags } = state
// 	return {
		
// 	}
// }

// const connectedSelectTags = connect(null)(SelectTags)
// export { connectedSelectTags as SelectTags }
export { SelectTags }