import React from 'react'
import _ from 'lodash'
import RGL, { WidthProvider } from "react-grid-layout"

const ReactGridLayout = WidthProvider(RGL);

class PsymatrixGrid extends React.PureComponent {
	static defaultProps = {
		className: "layout",
		isDraggable: true,
		isResizable: false,
		items: 15,
		cols: 6,
		rowHeight: 30,
		onLayoutChange: function() {},
		verticalCompact: false
	}

	constructor(props) {
		super(props)

		const layout = this.generateLayout();
		this.state = { layout }
	}

	generateDOM() {
		return _.map(_.range(this.props.items), function(i) {
			return (
				<div key={i}>
				<span className="text">{i}</span>
				</div>
			)
		})
	}
  // generateLayout() {
  //   const p = this.props;
  //   return _.map(new Array(p.items), function(item, i) {
  //     const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
  //     return {
  //       x: (i * 2) % 12,
  //       y: Math.floor(i / 6) * y,
  //       w: 2,
  //       h: y,
  //       i: i.toString()
  //     };
  //   });
  // }
	generateLayout() {
		const p = this.props;
		return _.map(new Array(p.items), function(item, i) {
			const random = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1
			var y = random
			const yPos = Math.floor(i / 6) * y +1
			console.log('i', i, 'y', y, 'random', random, 'yPos', yPos)
			return {
				x: (i * 2) % 12,
				y: yPos,
				w: 1,
				h: 3,
				i: i.toString()
			}
		})
	}

	onResize(layout, oldLayoutItem, layoutItem, placeholder) {
		// `oldLayoutItem` contains the state of the item before the resize.
		// You can modify `layoutItem` to enforce constraints.

		if (layoutItem.h < 3 && layoutItem.w > 2) {
			layoutItem.w = 2;
			placeholder.w = 2;
		}

		if (layoutItem.h >= 3 && layoutItem.w < 2) {
			layoutItem.w = 2;
			placeholder.w = 2;
		}
	}

	onLayoutChange(layout) {
		this.props.onLayoutChange(layout);
	}

	render() {
		// console.log(' --- this.props.onLayoutChange', this.props.onLayoutChange)
		// {/*onResize={this.onResize}*/}
		return (
			<ReactGridLayout
				layout={this.state.layout}
				onLayoutChange={this.onLayoutChange}
				{...this.props}
			>
				{this.generateDOM()}
			</ReactGridLayout>
		)
	}
}

// if (require.main === module) {
// 	require("../test-hook.jsx")(module.exports);
// }

export default PsymatrixGrid