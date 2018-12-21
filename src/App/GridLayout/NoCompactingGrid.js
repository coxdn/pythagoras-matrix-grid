import React from "react"
// import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import { connect } from 'react-redux'
import { DateInput } from '../_components'
import { ModalEdit } from "../ModalEdit"
import { gridActions, alertLayoutActions, modalActions } from '../../_actions'
import { gridPeopleSelector, getCreationId } from '../../_selectors'

import "../../../css/matrix-styles.css"

const ReactGridLayout = WidthProvider(RGL)

class NoCompactingGrid extends React.PureComponent {
  handleRemove = id => () => {this.props.dispatch(gridActions.remove(id))}
  
  editItem = value => () => this.props.dispatch(modalActions.showEditing(value))
  createNew = id => () => this.props.dispatch(modalActions.showCreating(id))

  calcNew = date => {
    const { creationID, dispatch } = this.props
    dispatch(gridActions.calcNew(creationID, date))
  }

  hookRef = node => {this.inputNode = node}

  handleItemClick = ev => {
    ev.stopPropagation()
    // console.log('--- this in handleItemClick', this, this.inputNode)
    if(this.inputNode)
    this.inputNode.focus()
  }


  onLayoutChange = layout => {
    this.props.dispatch(gridActions.updateAll(layout))
    // console.log('--- onLayoutChange in NoCompactingGrid', layout)
    this.props.onLayoutChange(layout)
    // console.log('--- this in onLayoutChange', this)
  }

  createEmpty = ev => {
    const { dispatch } = this.props
    if(this.inputNode) {
      const { creationID } = this.props
      dispatch(gridActions.remove(creationID))
    } else {
      dispatch(gridActions.addEmpty('В формате ДД.ММ.ГГГГ'))
    }
  }


  generateDOM = content => {
    return content.map((item) => {
      let innerJSX
      const {id, value, digits, fullDate, intermediate, name, empty} = item
      if (empty) {
        innerJSX =
          <div>
            <div className="inter clear-button btn btn-default btn1" title="Убрать" onClick={this.handleRemove(id)}></div>
            <DateInput onHookRef={this.hookRef} onCalcNew={this.calcNew} />
          </div>
      } else {
        const cd = x => content.composeDigit(x, digits[x]) // shortest name
        const saveOrName = name ? name : 
            <button type="button" className="btn btn-default btn-sm" onClick={this.createNew(id)}>
              <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Сохранить
            </button>
        innerJSX = 
          <div>
            <div className="inter clear-button btn btn-default btn1" title="Убрать" onClick={this.handleRemove(id)} onMouseDown={ev => ev.stopPropagation()}></div>
            <div className="inter clear-button btn btn-default btn2" title="Изменить" onClick={this.editItem(value)} onMouseDown={ev => ev.stopPropagation()}></div>
            <div className="matrix-people-name">{saveOrName}</div>
            <div className="intermediate">
              <div className="inter">{intermediate}</div>
              <div className="date">{fullDate}</div>
            </div>
            <div className="clear"></div>
            <div className="matrix">
              <div>{cd(1)}<br />{cd(2)}<br />{cd(3)}</div>
              <div className="center">{cd(4)}<br />{cd(5)}<br />{cd(6)}</div>
              <div>{cd(7)}<br />{cd(8)}<br />{cd(9)}</div>
            </div>
          </div>
      }

      return (
        <div key={id} onClick={this.handleItemClick}>
          {innerJSX}
        </div>
      )
    })
  }


  componentDidUpdate(prevProps) {
    // console.log('---- componentDidUpdate', prevProps, this.props, this.inputNode)
    const emptyCount = (props) => !props ? 0 : Object.values(props).filter(item => item && item.empty).length
    const currEmptyCount = emptyCount(this.props.content)
    const prevEmptyCount = emptyCount(prevProps.content)
    if(prevEmptyCount<currEmptyCount && this.inputNode)
    this.inputNode.focus() // focus on input field only if it field just been created
  }

  render() {
    const {config, layout, content, creationId, editor} = this.props
    
    return (
      <div>
        <div className='grid-layout-wrapper' onClick={this.createEmpty}>
          <ReactGridLayout
            layout={layout}
            {...config}
            onLayoutChange={this.onLayoutChange}
            >
            {this.generateDOM(content)}
          </ReactGridLayout>
          {!creationId ? <div className='text-on-grid'>Нажмите здесь чтобы добавить новый рассчет</div> : null}
        </div>
        {editor.show ? <ModalEdit /> : null}
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { gridConfig: config, alert, editor } = state
  const { layout } = config
  const creationId = getCreationId(state)
  const content = gridPeopleSelector(state)
  // debugger
  return {
    layout,
    config,
    content,
    creationId,
    alert,
    editor
  }
}

const connectedNoCompactingGrid = connect(mapStateToProps)(NoCompactingGrid)
export {connectedNoCompactingGrid as NoCompactingGrid}