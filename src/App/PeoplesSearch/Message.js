import React from 'react'
import { connect } from 'react-redux'

class Message extends React.Component {
	render() {
        const { search, count, _alert } = this.props
        const text = informInput({search, count})
        // return 
        // const error = _alert.hasIn(["peoples", "danger"]) ?  : null
		return <div className={"select-inform" + (_alert.hasIn(["peoples", "danger"]) ? " has-error" : "")}>
			<div className="help-block">{
				_alert.hasIn(["peoples", "danger"])
				? _alert.getIn(["peoples", "message"])
				: (text ? text : null)
			}</div>
		</div>
	}
}

function informInput({search, count}) {
    if (/[^\d\.]/.test(search))
        return false
    if (count>0 && /\d{1,2}\.\d{1,2}\.\d{4}/.test(search))
    	return "используйте Ctrl+Enter чтобы рассчитать введенную дату и Enter для рассчета выбранной из списка"
    return "или введите дату в формате ДД.ММ.ГГГГ и нажмите ввод для добавления ее в качестве новой даты для рассчета и/или сохранения"
}


const connectedMessage = connect(state => ({ _alert: state._alert }))(Message)
export { connectedMessage as Message }