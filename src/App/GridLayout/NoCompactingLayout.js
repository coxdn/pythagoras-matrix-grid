import React from "react"
// import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import { connect } from 'react-redux'
import { DateInput } from '../_components'
import { layoutActions, alertLayoutActions, modalActions } from '../../_actions'
import { pythagoras, getCreationID } from '../../_helpers'

import "../../../css/matrix-styles.css"

const ReactGridLayout = WidthProvider(RGL)

class NoCompactingLayout extends React.PureComponent {
  handleRemove = id => () => {this.props.dispatch(layoutActions.remove(id))}
  
  editItem = id => () => this.props.dispatch(modalActions.editing(id, this.props.content[id]))
  createNew = id => () => this.props.dispatch(modalActions.creating(id, this.props.content[id]))
  creatingNew = date => {
    const { creationID, dispatch } = this.props
    dispatch(layoutActions.createNew(creationID, date))
  }

  hookRef = node => {this.inputNode = node}

  handleItemClick = ev => {
    ev.stopPropagation()
    // console.log('--- this in handleItemClick', this, this.inputNode)
    if(this.inputNode)
    this.inputNode.focus()
  }


  onLayoutChange = layout => {
    this.props.dispatch(layoutActions.updateAll(layout))
    // console.log('--- onLayoutChange in NoCompactingLayout', layout)
    this.props.onLayoutChange(layout)
    // console.log('--- this in onLayoutChange', this)
  }

  createEmpty = ev => {
    const { dispatch } = this.props
    if(this.inputNode) {
      const { creationID } = this.props
      dispatch(layoutActions.remove(creationID))
    } else {
      dispatch(layoutActions.addEmpty('В формате ДД.ММ.ГГГГ'))
    }
  }


  generateDOM = ({ content }) => {
    return Object.keys(content).map((i) => {
      let innerJSX
      const item = {i}
      const _content = content[item.i]

      if (_content.createEmpty) {
        innerJSX = [
          <div key={1} className="inter clear-button btn btn-default btn1" title="Убрать" onClick={this.handleRemove(item.i)}></div>,
          <DateInput key={2} onHookRef={this.hookRef} onCreatingNew={this.creatingNew} />
        ]
      } else {
        const {digits, fullDate, intermediate} = pythagoras.calculate(_content.date)
        const cd = x => pythagoras.composeDigit(x, digits[x]) // c -> Compose, and d -> Digit
        const name = _content.name ? _content.name : 
            <button type="button" className="btn btn-default btn-sm" onClick={this.createNew(item.i)}>
              <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Сохранить
            </button>
        innerJSX = [
            <div key={1} className="inter clear-button btn btn-default btn1" title="Убрать" onClick={this.handleRemove(item.i)} onMouseDown={ev => ev.stopPropagation()}></div>,
            <div key={2} className="inter clear-button btn btn-default btn2" title="Изменить" onClick={this.editItem(item.i)} onMouseDown={ev => ev.stopPropagation()}></div>,
            <div key={3} className="matrix-people-name">{name}</div>,
            <div key={4} className="intermediate">
              <div className="inter">{intermediate}</div>
              <div className="date">{fullDate}</div>
            </div>,
            <div key={5} className="clear"></div>,
            <div key={6} className="matrix">
              <div>{cd(1)}<br />{cd(2)}<br />{cd(3)}</div>
              <div className="center">{cd(4)}<br />{cd(5)}<br />{cd(6)}</div>
              <div>{cd(7)}<br />{cd(8)}<br />{cd(9)}</div>
            </div>
        ]
      }

      return (
        <div key={item.i} onClick={this.handleItemClick}>
          {innerJSX}
        </div>
      )
    })
  }


  componentDidUpdate() {
    if(this.inputNode)
    this.inputNode.focus()
  }

  render() {
    const {config, layout, content, creationID} = this.props

    return (
      <div className='grid-layout-wrapper' onClick={this.createEmpty}>
        <ReactGridLayout
          layout={layout}
          {...config}
          onLayoutChange={this.onLayoutChange}
          >
          {this.generateDOM({content})}
        </ReactGridLayout>
        {!creationID ? <div className='text-on-grid'>Нажмите здесь чтобы ввести новую дату</div> : null}
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { layoutConfig: config, layoutContent: content, alert } = state
  const { layout } = config
  const creationID = getCreationID(content)
  return {
    layout,
    config,
    content,
    alert,
    creationID
  }
}

const connectedNoCompactingLayout = connect(mapStateToProps)(NoCompactingLayout)
export {connectedNoCompactingLayout as NoCompactingLayout}