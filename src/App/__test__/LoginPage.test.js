import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import { LoginPage } from '../LoginPage'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'
import thunk from 'redux-thunk'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: false
 })


describe('LoginPage component tests', () => {

  // create any initial state needed
  const initialState = {
    authentication: {
      loggingIn: true,
      loggedIn: false
    }
  }; 
  // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState)
  const props = {
    store,
    dispatch: function() {}
  }

  // delete window.location
  // window.location = { replace: jest.fn() }

  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/login' ]}>
      <LoginPage {...props} />
    </MemoryRouter>
  )

  test('when loggingIn is true - spinner must be present', () => {
    expect(wrapper.find('img')).toHaveLength(1)
  });

  test('form must be present in an amount of 1 piece', () => {
    expect(wrapper.find('form')).toHaveLength(1)
  });
})