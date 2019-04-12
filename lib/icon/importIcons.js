//导入多个svg
let importAll = requireContext => requireContext.keys().forEach(requireContext)
try {
	importAll(require.context('../../icons/', true, /\.svg$/))
} catch (error) {
	// console.log(error)
}
