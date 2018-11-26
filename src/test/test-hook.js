import React from "react";
import ReactDOM from "react-dom";
import "../../css/styles.css"
import "../../css/example-styles.css"
typeof window !== "undefined" && (window.React = React); // for devtools

class ExampleLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { layout: [] }
  }

  componentReceiveProps(nextProps) {
    console.log('--- componentReceiveProps')
  }

  onLayoutChange = layout => {
    console.log('--- onLayoutChange')
    this.setState({ layout: layout });
  };

  stringifyLayout() {
    return this.state.layout.map(function(l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  }

  render() {
    const { Layout } = this.props
    console.log('--- props in ExampleLayout', this.props);
    return (
      <div>
        <div className="layoutJSON">
          Displayed as <code>[x, y, w, h]</code>:
          <div className="columns">{this.stringifyLayout()}</div>
        </div>
        <Layout onLayoutChange={this.onLayoutChange} />
      </div>
    )
  }
}

export default ExampleLayout
