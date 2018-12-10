import React from "react"
import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import { connect } from 'react-redux'
import { layoutActions, layoutAlertActions } from '../../_actions'
import { psy } from '../../_helpers'

import "../../../css/matrix-styles.css"

const ReactGridLayout = WidthProvider(RGL)

class NoCompactingLayout extends React.PureComponent {
  /*static defaultProps = {
    className: "layout",
    isResizable: false,
    items: 7,
    cols: 6,
    rowHeight: 80,
    onLayoutChange: function() {},
    // This turns off compaction so you can place items wherever.
    verticalCompact: false
  }*/

  constructor(props) {
    super(props)
    /*if(props.layoutConfig.items==0) {
        props.dispatch(layoutActions.add("test one"))
        props.dispatch(layoutActions.add("test two"))
        props.dispatch(layoutActions.add("test three"))
        props.dispatch(layoutActions.add("test four"))
    }*/
    this.handleCreateNew = this.handleCreateNew.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  generateDOM() {
    const { config, layout, content } = this.props
    return layout.map((item, i) => {
      let inner
      const _content = content[item.i]

      if (_content.createNew) {
        inner = <input placeholder="Введите дату..." onChange={this.handleInputChange} size="10" onBlur={this.handleRemove(item.i)} ref={(node) => {this.inputNode = node}} />
      } else {
        const {digits, fullDate, intermediate} = psy.calculate(_content.date)
        const cd = x => psy.composeDigit(x, digits[x]) // c -> Compose, and d -> Digit
        inner = [
            <div key={1} className="inter clear-button btn btn-primary btn1" title="Убрать" onClick={this.handleRemove(item.i)}></div>,
            <div key={2} className="inter clear-button btn btn-primary btn2" title="Изменить"></div>,
            <div key={3} className="matrix-people-name">{_content.name}</div>,
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
          {inner}
        </div>
          )
      
    })
  }

  handleRemove = id => () => {this.props.dispatch(layoutActions.remove(id))}

  handleItemClick = ev => {
    ev.stopPropagation()
    console.log('--- this in handleItemClick', this, this.inputNode)
    this.inputNode.focus()
  }


  onLayoutChange = layout => {
    this.props.dispatch(layoutActions.updateAll(layout))
    console.log('--- onLayoutChange in NoCompactingLayout', layout)
    this.props.onLayoutChange(layout)
    console.log('--- this in onLayoutChange', this)
  }

  handleCreateNew(ev) {
    console.log('--- handleCreateNew', this.props.content)
    this.props.dispatch(layoutActions.add({createNew: true}))
  }

  handleInputChange(ev) {

  }

  handleInputClick(ev) {
    // ev.stopPropagation()
    // ev.preventDefault()
    console.log('--- handleInputClick')
    // ev.target.focus()
  }

  componentDidUpdate() {
    if(this.inputNode)
    this.inputNode.focus()
  }

  render() {
    console.log('--- props in render NoCompactingLayout', this.props)
    window.__ = this

    const textOnGrid = !this.props.config.items ? <div className='text-on-grid'>Нажмите сюда чтобы ввести новую дату</div> : null
    return (
      <div className='grid-layout-wrapper' onClick={this.handleCreateNew}>
        {textOnGrid}
        <ReactGridLayout
          layout={this.props.layout}
          {...this.props.config}
          onLayoutChange={this.onLayoutChange}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    )
  }
}


const connectedNoCompactingLayout = connect(state => {
  const { layoutConfig: config, layoutContent: content, alert } = state
  const { layout } = config
  return {
    layout,
    config,
    content,
    alert
  }
})(NoCompactingLayout)
export {connectedNoCompactingLayout as NoCompactingLayout}
// import func from "./test-hook.js"
// func(NoCompactingLayout)

// module.exports = NoCompactingLayout;

// if (require.main === module) {
//   require("./test-hook.js")(module.exports);
// }