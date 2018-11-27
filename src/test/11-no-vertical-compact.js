import React from "react"
import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import { connect } from 'react-redux'
import { addItem } from '../AC'

const ReactGridLayout = WidthProvider(RGL);
// window._ = _
class NoCompactingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    isResizable: false,
    items: 7,
    cols: 6,
    rowHeight: 80,
    onLayoutChange: function() {},
    // This turns off compaction so you can place items wherever.
    verticalCompact: false
  }

  constructor(props) {
    super(props)
    props.addItem("fdf")
    props.addItem("fdf")
    // console.log('--- constructor layout', layout)
    const layout = this.generateLayout()
    this.state = {layout}
  }

  generateDOM() {
    return this.props.layoutConfig.items.map((item, i) => {
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
    return _.map(new Array(p.items.length), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      const index = i + '_' + Math.random()
      return {
        x: i,
        y: 0,
        w: 1,
        h: 1,
        i: index
      };
    });
  }

  onLayoutChange = layout => {
    console.log('--- onLayoutChange in NoCompactingLayout', layout)
    this.props.onLayoutChange(layout);
  }

  render() {
    console.log('--- props in render NoCompactingLayout', this.props)
    // const {...props} = {...this.props.layoutConfig, onLayoutChange: this.props.onLayoutChange}
        // layout={this.props.layoutConfig.items}
    return (
      <ReactGridLayout
        layout={this.state.layout}
        {...this.props.layoutConfig}
        onLayoutChange={this.onLayoutChange}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}


export default connect(state => ({
  layoutConfig: state.layoutConfig
}), { addItem })(NoCompactingLayout)
// import func from "./test-hook.js"
// func(NoCompactingLayout)

// module.exports = NoCompactingLayout;

// if (require.main === module) {
//   require("./test-hook.js")(module.exports);
// }