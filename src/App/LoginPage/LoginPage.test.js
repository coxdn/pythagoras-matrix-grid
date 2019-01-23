import React from 'react'
import Enzyme, { mount } from 'enzyme'
import { LoginPage } from './LoginPage'
import { Provider } from 'react-redux'
import { store } from '../../_helpers'
// import expect from 'expect'
// import articles from '../fixtures'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
// const TestUtils = React.addons.TestUtils;

describe('LoginPage component tests', () => {
  // const component = ReactTestUtils.renderIntoDocument(
  //   <Provider store={store}>
  //     <LoginPage loginIn={true}/>
  //   </Provider>
  // )
  const component = mount(
      <Provider store={store}>
        <LoginPage />
      </Provider>
      )

  // test('login page must have auth form', () => {
  //   ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form')
  // })

  // test('login must have 2 fields', () => {
  //   const form = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form')
  //   console.log(form.childElementCount)
  //   //expect(form.childElementCount).toBe()
  // })
  // it('should render article list', () => {
  //   const container = shallow(
  //     <LoginPage articles={articles} toggleOpenItem={() => {}} />
  //   )

  //   expect(container.find('.test__article-list--item').length).toEqual(
  //     articles.length
  //   )
  // })

  // it('should render closed articles by default', () => {
  //   const container = render(<ArticleListWithAccordion articles={articles} />)

  //   expect(container.find('.test__article--body').length).toEqual(0)
  // })

  // it('should open an article on click', () => {
  //   const container = mount(<LoginPage articles={articles} />)

  //   container
  //     .find('.test__article--btn')
  //     .at(0)
  //     .simulate('click')

  //   expect(container.find('.test__article--body').length).toEqual(1)
  // })

  // it('should trigger data fetching on mount', (done) => {
  //   mount(
  //     <ArticleListWithAccordion
  //       articles={[]}
  //       toggleOpenItem={() => {}}
  //       fetchData={done}
  //     />
  //   )
  // })
})