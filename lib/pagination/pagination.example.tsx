import React from 'react'
import PaginationHook from './pagination'
import Pagination from './pagination.class'
const PaginationExample: React.FunctionComponent = () => {
	// return <Pagination total={500} pageSize={10} current={3} onChange={page => console.log(`发送请求到${page}页`)} />

	return (
		<div>
			<div>
				class:
				<Pagination total={500} />
			</div>
			<div>
				hooks:
				<PaginationHook total={500} />
			</div>
		</div>
	)
}
export default PaginationExample
