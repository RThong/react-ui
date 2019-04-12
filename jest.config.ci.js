const base = require('./jest.config')
// 持续集成的测试需要测试覆盖率
module.exports = Object.assign({}, base, {
	// 测试覆盖率相关
	// 是否收集测试覆盖率
	collectCoverage: true,
	collectCoverageFrom: ['{lib,include}/**/*.{ts,tsx,js,jsx}', '!**/node_modules/**'],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],

	reporters: ['jest-junit']
})
