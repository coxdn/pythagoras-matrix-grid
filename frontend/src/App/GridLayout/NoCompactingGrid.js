import React, { Fragment } from "react"
import RGL, { WidthProvider } from "react-grid-layout"
import { connect } from 'react-redux'
import { DateInput } from '../_components'
import { ModalEdit } from "../ModalEdit"
import { gridActions, modalActions } from '../../_actions'
import { gridPeopleSelector, getCreationId } from '../../_selectors'

import "../../../css/matrix.css"

const ReactGridLayout = WidthProvider(RGL)

class NoCompactingGrid extends React.PureComponent {
  handleRemove = (id) => () => this.props.gridRemove(id)
  
  editItem = (value) => () => this.props.modalShowEditing(value)
  createNew = (id) => () => this.props.modalShowCreating(id)

  calcNew = (date) => {
    const { creationID, gridCalcNew } = this.props
    gridCalcNew(creationID, date)
  }

  hookRef = (node) => {this.inputNode = node}

  handleItemClick = (ev) => {
    ev.stopPropagation()
    if(this.inputNode)
    this.inputNode.focus()
  }

  createEmpty = () => {
    const { gridRemove, gridAddEmpty } = this.props

    if(this.inputNode) {
      const { creationID } = this.props
      gridRemove(creationID)
    } else {
      gridAddEmpty('В формате ДД.ММ.ГГГГ')
    }
  }


  generateDOM = (content) => {
    return content.map((item) => {
      let matrix
      const {id, value, digits, fullDate, intermediate, name, empty, age} = item

      if (empty) {
        matrix =
          <Fragment>
            <div
              className="control-button btn btn-default btn-close"
              title="Убрать"
              onClick={this.handleRemove(id)}
              onMouseDown={ev => ev.stopPropagation()}
            ></div>
            <DateInput onHookRef={this.hookRef} onCalcNew={this.calcNew} />
          </Fragment>
      } else {
        const cd = (x) => content.composeDigit(x, digits[x]) // shortest name
        const nameField = name ? name : 
            <button
              type="button"
              className="btn btn-default btn-sm"
              onClick={this.createNew(id)}
              onMouseDown={ev => ev.stopPropagation()}
            >
              <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Сохранить
            </button>

        matrix = 
          <Fragment>
            <div
              className="control-button btn btn-default btn-close"
              title="Убрать"
              onClick={this.handleRemove(id)}
              onMouseDown={ev => ev.stopPropagation()}
            ></div>
            {value ? <div className="control-button btn btn-default btn-edit" title="Изменить" onClick={this.editItem(value)} onMouseDown={ev => ev.stopPropagation()}></div> : null}
            <div className="matrix-people-name">{nameField}</div>
            <div className="intermediate">
              <div className="summary">{intermediate}</div>
              <div className="date">{fullDate}{age.digits && age.digits<135 ? ' ('+age.format+')' : ''}</div>
            </div>
            <div className="clear"></div>
            <div className="matrix">
              <div>{cd(1)}<br />{cd(2)}<br />{cd(3)}</div>
              <div className="center">{cd(4)}<br />{cd(5)}<br />{cd(6)}</div>
              <div>{cd(7)}<br />{cd(8)}<br />{cd(9)}</div>
            </div>
          </Fragment>
      }

      return (
        <div key={id} onClick={this.handleItemClick}>
          <div className="matrix-item">
            {matrix}
          </div>
        </div>
      )
    })
  }


  componentDidUpdate(prevProps) {
    // function returns the number of empty grid tiles (tile for new date)
    const emptyNumber = (props) => !props ? 0 : Object.keys(props).filter(key => props[key] && props[key].empty).length
    const currEmptyNumber = emptyNumber(this.props.content)
    const prevEmptyNumber = emptyNumber(prevProps.content)
    // focus on input field only if it field just been created
    if(prevEmptyNumber < currEmptyNumber && this.inputNode)
      this.inputNode.focus()
  }

  render() {
    const {config, layout, content, creationId, editor} = this.props
    
    return (
      <div>
        <div className="grid-layout-wrapper" onClick={this.createEmpty}>
          <ReactGridLayout
            layout={layout}
            {...config}
            onLayoutChange={this.props.gridUpdateAll}
            >
            { this.generateDOM(content) }
          </ReactGridLayout>
          {
            !creationId
              ? <div className="text-on-grid">Нажмите сюда чтобы рассчитать новую дату</div>
              : null
          }
        </div>
        {editor.show ? <ModalEdit /> : null}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { gridConfig: config, alert, editor } = state
  const { layout } = config
  const creationId = getCreationId(state)
  const content = gridPeopleSelector(state)
  return {
    layout,
    config,
    content,
    creationId,
    alert,
    editor
  }
}

const mapDispatchToProps = {
  modalShowEditing: modalActions.showEditing,
  modalShowCreating: modalActions.showCreating,
  gridRemove: gridActions.remove,
  gridCalcNew: gridActions.calcNew,
  gridUpdateAll: gridActions.updateAll,
  gridAddEmpty: gridActions.addEmpty
}

const connectedNoCompactingGrid = connect(mapStateToProps, mapDispatchToProps)(NoCompactingGrid)
export {connectedNoCompactingGrid as NoCompactingGrid}