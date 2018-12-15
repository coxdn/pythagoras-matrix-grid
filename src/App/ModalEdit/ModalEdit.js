import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { SelectTags } from '../_components'
import { modalActions } from '../../_actions'

import '../../../css/modal.css'

class ModalEdit extends React.Component {
  state = {
      id: null,
      value: 0,
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
    const { value, id, _name, date, tags } = this.state
    this.setState({ edited: false, submitted: true })
    this.props.dispatch(modalActions.save({ value, id, _name, date, tags }))
  }

  componentWillReceiveProps(nextProps) {
    // console.log('--- ModalEdit.componentWillReceiveProps', nextProps)
    const { value, id, _name, date, tags } = nextProps.editor
    this.setState({ value, id, _name, date, tags })
  }

  render () {
    const { value, _name, date, tags, submitted, edited } = this.state
    const { savingIn } = this.props.editor
    console.log('--- ModalEdit savingIn', savingIn)
    return (
      <ReactModal 
         isOpen={this.props.editor.show}
         contentLabel="onRequestClose Example"
         onRequestClose={this.handleCloseModal}
         shouldCloseOnOverlayClick={false}
         ariaHideApp={false}
      >
          <div className={'form-group' + (submitted && !_name ? ' has-error' : '')}>
              <label htmlFor="_name">Имя, псевдоним, ФИО</label>
              <input type="text" className="form-control" name="_name" value={_name} onChange={this.handleChange} />
              {submitted && !_name &&
                  <div className="help-block">Необходимо заполнить это поле</div>
              }
          </div>
          <div className={'form-group' + (submitted && !date ? ' has-error' : '')}>
              <label htmlFor="date">Дата рождения</label>
              <input type="text" className="form-control" name="date" value={date} onChange={this.handleChange} />
              {submitted && !date &&
                  <div className="help-block">Введите пароль</div>
              }
          </div>
          <div>
              <label>Теги</label>
              <SelectTags tags={tags} onChangeTags={this.onChangeTags} />
          </div>
          <div className="modal-btns-wrapper">
            <div>
              <button type="button" className={"btn btn-default btn-lg" + (edited ? '' : ' disabled')} onClick={this.savePeople}>
                <span className={"glyphicon " + (savingIn ? "glyphicon-refresh glyphicon-refresh-animate" : "glyphicon-floppy-save")} aria-hidden="true"></span> Сохранить
              </button>&nbsp;
              <button type="button" className="btn btn-default btn-sm" onClick={this.handleCloseModal}>
                <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Отмена
              </button>&nbsp;
              {value==0 ? null :
              <button type="button" className={"btn btn-default btn-sm" + (!savingIn ? '' : ' disabled')}>
                <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Удалить
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
        editor,
        _alert
    }
}

const connectedModalEdit = connect(mapStateToProps)(ModalEdit)
export { connectedModalEdit as ModalEdit }