import React from "react"
import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import { connect } from 'react-redux'

const ReactGridLayout = WidthProvider(RGL);
window._ = _
class NoCompactingLayout extends React.PureComponent {
  // static defaultProps = {
  //   className: "layout",
  //   isResizable: false,
  //   items: 7,
  //   cols: 6,
  //   rowHeight: 80,
  //   onLayoutChange: function() {},
  //   // This turns off compaction so you can place items wherever.
  //   verticalCompact: false
  // }

  constructor(props) {
    super(props)

    // const layout = this.generateLayout()
    // console.log('--- constructor layout', layout)
    // this.state = {layout}
  }

  generateDOM() {
    return _.map(_.range(this.props.layoutConfig.items), function(i, item) {
      console.log(i)
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props.layoutConfig;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: i,
        y: 0,
        w: 1,
        h: 1,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    console.log('--- onLayoutChange in NoCompactingLayout')
    this.props.onLayoutChange(layout);
  }

  render() {
    console.log('--- props in render NoCompactingLayout', this.props)
    return (
      <ReactGridLayout
        layout={this.props.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props.layoutConfig}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}


export default connect(state => ({
  layoutConfig: state.layoutConfig
}))(NoCompactingLayout)
// import func from "./test-hook.js"
// func(NoCompactingLayout)

// module.exports = NoCompactingLayout;

// if (require.main === module) {
//   require("./test-hook.js")(module.exports);
// }