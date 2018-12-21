import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import "../../../css/grid-styles.css"
import "../../../css/info-grid-wrapper-styles.css"

// typeof window !== "undefined" && (window.React = React) // for devtools

class GridInfoWrapper extends React.Component {
  state = { layout: [] }

  onLayoutChange = layout => {
    this.setState({ layout: this.props.gridConfig.layout })
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
    return (
      <div>
        {null /*<div className="layoutJSON">
          Displayed as <code>[x, y, w, h]</code>:
          <div className="columns">{this.stringifyLayout()}</div>
        </div>*/}
        <Layout onLayoutChange={this.onLayoutChange} />
      </div>
    )
  }
}

const connectedGridInfoWrapper = connect(state => ({
  gridConfig: state.gridConfig
}))(GridInfoWrapper)
export {connectedGridInfoWrapper as GridInfoWrapper}
