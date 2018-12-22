import React from 'react'
import App from './App'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

import { store } from '../_helpers'
// import configureStore from '../_helpers/store.helper'
// const store = configureStore()


const Root = () => (
		<Provider store={store}>
			<App />
		</Provider>
	)

export default hot(module)(Root)
// export default Root