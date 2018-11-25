import React, {Component} from "react"
import PsymatrixGrid from './components/PsymatrixGrid'
import "../css/styles.css"
import "../css/example-styles.css"
typeof window !== "undefined" && (window.React = React); // for devtools

export default class ExampleLayout extends React.Component {
  state = { layout: [] };

  onLayoutChange = layout => {
    this.setState({ layout: layout })
  }

  stringifyLayout() {
    return this.state.layout.map(function(l) {
      return (
        <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="layoutJSON">
          Displayed as <code>[x, y, w, h]</code>:
          <div className="columns">{this.stringifyLayout()}</div>
        </div>
        <PsymatrixGrid onLayoutChange={this.onLayoutChange} />
      </div>
    );
  }
}
