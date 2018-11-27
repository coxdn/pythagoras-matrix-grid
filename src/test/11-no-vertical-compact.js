import React from "react"
import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import { connect } from 'react-redux'
import { addItem, updateLayout } from '../AC'

const ReactGridLayout = WidthProvider(RGL);
// window._ = _
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
    props.addItem("test one")
    props.addItem("test two")
    // console.log('--- constructor layout', layout)
    //const layout = this.generateLayout()
    //this.state = {layout}
  }

  generateDOM() {
    const {layoutConfig, content} = this.props
    return layoutConfig.layout.map((item, i) => {
      console.log(i)
      return (
        <div key={item.i}>
          <span className="text">{content[item.i]}</span>
        </div>
      );
    });
  }

  // generateLayout() {
  //   const p = this.props.layoutConfig;
  //   return _.map(new Array(p.items), function(item, i) {
  //     const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
  //     const index = i + '_' + Math.random()
  //     return {
  //       x: i,
  //       y: 0,
  //       w: 1,
  //       h: 1,
  //       i: index
  //     };
  //   });
  // }

  onLayoutChange = layout => {
    this.props.updateLayout(layout)
    console.log('--- onLayoutChange in NoCompactingLayout', layout)
    this.props.onLayoutChange(layout)
  }

  render() {
    console.log('--- props in render NoCompactingLayout', this.props)
    window.__ = this
    // const {...props} = {...this.props.layoutConfig, onLayoutChange: this.props.onLayoutChange}
        // layout={this.props.layoutConfig.items}
    return (
      <ReactGridLayout
        layout={this.props.layoutConfig.layout}
        {...this.props.layoutConfig}
        onLayoutChange={this.onLayoutChange}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}


export default connect(state => ({
  layoutConfig: state.layoutConfig,
  content: state.layoutContent
}), { addItem, updateLayout })(NoCompactingLayout)
// import func from "./test-hook.js"
// func(NoCompactingLayout)

// module.exports = NoCompactingLayout;

// if (require.main === module) {
//   require("./test-hook.js")(module.exports);
// }