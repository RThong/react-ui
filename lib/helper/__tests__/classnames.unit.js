import classnames from '../classnames'
describe('classnames', () => {
	it('接收 1 个 className', () => {
		const result = classnames('a')
		expect(result).toEqual('a')
	})
	it('接收 undefined 不出现undefined', () => {
		const result = classnames('a', undefined)
		expect(result).toEqual('a')
	})
	it('接收 各种奇怪的值', () => {
		const result = classnames('a', undefined, '中文', false, null)
		expect(result).toEqual('a 中文')
	})
	it('接收 0 个 参数', () => {
		const result = classnames()
		expect(result).toEqual('')
	})
})
