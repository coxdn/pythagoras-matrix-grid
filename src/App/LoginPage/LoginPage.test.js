import React from 'react'
// import Enzyme, { mount, render, shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
import ReactTestUtils from 'react-dom/test-utils'
import { LoginPage } from './LoginPage'
// import articles from '../fixtures'

// Enzyme.configure({ adapter: new Adapter() })

describe('LoginPage component tests', () => {
  const component = ReactTestUtils.renderIntoDocument(<LoginPage />)

  test('login page must have auth form', () => {
    ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form')
  })

  test('login must have 2 fields', () => {
    const form = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form')
    console.log(form.childElementCount)
    //expect(form.childElementCount).toBe()
  })
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