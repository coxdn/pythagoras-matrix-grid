import React from "react";
// import { connect } from 'react-redux'
import "../../../css/grid.css"
import "../../../css/info-grid-wrapper.css"

class GridInfoWrapper extends React.Component {
  render() {
    const { Layout } = this.props
    return (
      <div>
        <Layout />
      </div>
    )
  }
}

export { GridInfoWrapper }


// uncomment this class and comment out class above if necessary to show grid debugging information
/*
class GridInfoWrapper extends React.Component {
  state = { layout: [] }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ layout: nextProps.gridConfig.layout })
  }
  
  stringifyLayout() {
    return this.props.gridConfig.layout.map(function(l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      )
    })
  }
  

  render() {
    const { Layout } = this.props

    // display debugging information.
    return (
      <div>
          <div className="layoutJSON">
            Displayed as <code>[x, y, w, h]</code>:
            <div className="columns">{this.stringifyLayout()}</div>
          </div>
        <Layout />
      </div>
    )
  }
}

const connectedGridInfoWrapper = connect(state => ({
  gridConfig: state.gridConfig
}))(GridInfoWrapper)
export {connectedGridInfoWrapper as GridInfoWrapper}
*/