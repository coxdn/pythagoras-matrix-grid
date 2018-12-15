import React from 'react'
import { connect } from 'react-redux'

class DateInput extends React.Component {
	state = {
		date: ''
	}

	handleInputChange = ev => this.setState({date: ev.target.value})

	handleInputKeyPress = ev => {
		// ev.stopPropagation()
		const { onCreatingNew } = this.props
		const char = ev.which || ev.keyCode
		if(char == 13) onCreatingNew(this.state.date)
	}

	hookRef = node => {
		this.inputNode = node
		this.props.onHookRef(node)
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	console.log('--- DateInput.componentWillUpdate')
	// }
	// componentWillReceiveProps(nextProps, nextState) {
	// 	console.log('--- DateInput.componentWillReceiveProps', this.props)
	// }

	render() {
		const {_alert} = this.props
		return (
            <div className={'form-group' + (_alert.hasError ? ' has-error' : '')}>
                <input
                	className="form-control"
		            placeholder="Введите дату..."
		            size="10"
		            value={this.state.date}
		            onChange={this.handleInputChange}
		            onKeyPress={this.handleInputKeyPress}
		            onMouseDown={ev => ev.stopPropagation()}
		            ref={this.hookRef}
		         />
                {_alert.createItemMessage &&
                    <div className="help-block">{_alert.createItemMessage}</div>
                }
            </div>
			
        )
    }
}

const connectedDateInput = connect(state => {
	const {_alert} = state
	return {
		_alert
	}
})(DateInput)
export {connectedDateInput as DateInput}