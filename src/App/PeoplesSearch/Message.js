import React from 'react'
import { connect } from 'react-redux'

class Message extends React.Component {
    render() {
        const { search, count, _alert } = this.props
        const text = informInput({search, count})
        return <div className={"select-inform" + (_alert.hasIn(["peoples", "danger"]) ? " has-error" : "")}>
            <div className="help-block">
                {
                    _alert.hasIn(["peoples", "danger"])
                        ? _alert.getIn(["peoples", "message"])
                        : (text ? text : null)
                }
            </div>
        </div>
    }
}

// this function is intended to simplest check of input value of search on the contents of any symbols, except digits and dots,
// and check for a value similar to the date
function informInput({search, count}) {
    // if we found any character besides digits and dots
    if (/[^\d.]/.test(search))
        return false
    // simplest date verification.
    // further and more detailed verification will be performed wher user press Enter or Ctrl+Enter (depend on circumstances)
    if (/\d{1,2}\.\d{1,2}\.\d{4}/.test(search)) {
        return count
            ? "используйте Ctrl+Enter чтобы рассчитать введенную дату и Enter для рассчета выбранной из списка"
            : "используйте Enter чтобы рассчитать"
    }
    return "или введите дату в формате ДД.ММ.ГГГГ и нажмите ввод для добавления ее в качестве новой даты для рассчета и/или сохранения"
}


const connectedMessage = connect(state => ({ _alert: state._alert }))(Message)
export { connectedMessage as Message }