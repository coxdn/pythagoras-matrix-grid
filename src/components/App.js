import React, {Component} from 'react'
// import TableDND from './TableDND'
// import PsymatrixGrid from './PsymatrixGrid'
import NoCompactingLayout from "../test/11-no-vertical-compact.js"
import ExampleLayout from "../test/test-hook.js"
// func(NoCompactingLayout)
// import ExampleLayout from '../test-hook'

class App extends Component {
	render() {
		return (
			<ExampleLayout Layout={NoCompactingLayout} />
		)
	}
}

export default App