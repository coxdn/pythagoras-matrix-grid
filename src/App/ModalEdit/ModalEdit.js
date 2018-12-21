import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { SelectTags } from '../_components'
import { modalActions } from '../../_actions'
import { editPeopleSelector } from '../../_selectors'

import '../../../css/modal.css'

class ModalEdit extends React.Component {
  state = {
      _name: '',
      date: '',
      tags: [],
      submitted: false,
      edited: false
  }
  
  handleChange = ev => {
      const { name, value } = ev.target
      this.setState({ [name]: value, edited: true })
  }

  onChangeTags = tags => this.setState({ tags, edited: true })

  handleCloseModal = () => {
    const { modalHide } = this.props
    this.props.dispatch(modalActions.hide())
    this.setState({edited: false, submitted: false})
  }

  savePeople = () => {
    // console.log('--- savePeople tags', this.state.tags)
    const { _name, date, tags } = this.state
    const { id } = this.props.editor
    const { value } = this.props.people
    this.setState({ edited: false, submitted: true })
    this.props.dispatch(modalActions.save({ id, value, _name, date, tags }))
  }

  removePeople = () => this.props.dispatch(modalActions.remove(this.props.editor.value))

  componentDidMount() {
    // console.log('--- ModalEdit.componentDidMount', this.props)
    const { name, date, tags } = this.props.people
    this.setState({ _name: name, date, tags })
  }

  render () {
    const { _name, date, tags, submitted, edited } = this.state
    const { _alert, people: { value }, editor: { inSaving, inRemoving }} = this.props
    const saveIsActive = !(!edited || (!_name && value) || (!_name && edited) || !date)
    // console.log('--- ModalEdit inSaving', inSaving, '; value=', value, this.state)
    return (
      <ReactModal 
         isOpen={this.props.editor.show}
         contentLabel="onRequestClose Example"
         onRequestClose={this.handleCloseModal}
         shouldCloseOnOverlayClick={false}
         ariaHideApp={false}
      >
          {_alert.hasIn(["editor", "class"]) &&
              <div className={`alert ${_alert.getIn(["editor", "class"])}`}>{_alert.getIn(["editor", "message"])}</div>
          }
          <div className={'form-group' + ((!_name && value) || (!_name && edited) ? ' has-error' : '')}>
              <label htmlFor="_name">Имя, псевдоним, ФИО</label>
              <input type="text" className="form-control" name="_name" value={_name} onChange={this.handleChange} />
              {((!_name && value) || (!_name && edited)) &&
                  <div className="help-block">Необходимо заполнить это поле</div>
              }
          </div>
          <div className={'form-group' + (!date ? ' has-error' : '')}>
              <label htmlFor="date">Дата рождения</label>
              <input type="text" className="form-control" name="date" value={date} onChange={this.handleChange} />
              {!date &&
                  <div className="help-block">Необходимо заполнить это поле</div>
              }
          </div>
          <div>
              <label>Теги</label>
              <SelectTags tags={tags} onChangeTags={this.onChangeTags} />
          </div>
          <div className="modal-btns-wrapper">
            <div>
              <button type="button" className={"btn btn-default btn-lg" + (saveIsActive ? '' : ' disabled')} onClick={saveIsActive ? this.savePeople : null}>
                <span className={"glyphicon " + (inSaving ? "glyphicon-refresh glyphicon-refresh-animate" : "glyphicon-floppy-save")} aria-hidden="true"></span> Сохранить
              </button>&nbsp;
              <button type="button" className="btn btn-default btn-sm" onClick={this.handleCloseModal}>
                Отмена
              </button>&nbsp;
              {!value ? null :
              <button type="button" className={"btn btn-default btn-sm" + (!inSaving ? '' : ' disabled')} onClick={this.removePeople}>
                <span className={"glyphicon " + (inRemoving ? "glyphicon-refresh glyphicon-refresh-animate" : "glyphicon-trash")} aria-hidden="true"></span> Удалить
              </button>
            }
            </div>
          </div>
      </ReactModal>
    )
  }
}

function mapStateToProps(state) {
    const { editor, _alert } = state
    return {
        people: editPeopleSelector(state),
        editor,
        _alert
    }
}

const connectedModalEdit = connect(mapStateToProps)(ModalEdit)
export { connectedModalEdit as ModalEdit }