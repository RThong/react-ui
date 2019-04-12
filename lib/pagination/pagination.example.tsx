import React from 'react'
import Pagination from './pagination'
const PaginationExample: React.FunctionComponent = () => {
	return <Pagination total={500} pageSize={10} current={3} onChange={page => console.log(`发送请求到${page}页`)} />
}
export default PaginationExample
