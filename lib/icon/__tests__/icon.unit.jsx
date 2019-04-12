import renderer from 'react-test-renderer'
import Icon from '../icon'
import React from 'react'
import { mount } from 'enzyme'
describe('icon', () => {
	it('渲染 传入props', () => {
		const json = renderer.create(<Icon type="alipay" />).toJSON()
		expect(json).toMatchSnapshot()
	})
	it('渲染 未传入props', () => {
		const json = renderer.create(<Icon />).toJSON()
		expect(json).toMatchSnapshot()
	})
	it('onClick', () => {
		const fn = jest.fn()
		const component = mount(<Icon type="alipay" onClick={fn} />)
		// 模拟click
		component.simulate('click')
		expect(fn).toBeCalled()
	})
})
