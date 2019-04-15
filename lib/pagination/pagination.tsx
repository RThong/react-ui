import React, { useState, useEffect } from 'react'
import './style.scss'
import classnames from 'classnames'
interface Props {
	current?: number
	pageSize?: number
	total?: number
	onChange?: (page: number) => void
}
const Pagination: React.FunctionComponent<Props> = props => {
	const total = props.total || 0
	const pageSize = props.pageSize || 10
	// const total
	const pageCount = total && Math.ceil(total / pageSize)
	const [current, setCurrent] = useState<number>(props.current || 1)
	const [arr, setArr] = useState<number[]>([])

	useEffect(() => {
		console.log('hook useEffect:', current)

		setArr(
			// Array(pageCount)
			// 	.fill(undefined)
			// 	.map((item, index) => index + 1)
			// 	.filter(page => {
			// 		if (page === 1 || page === pageCount) {
			// 			return true
			// 		} else if (Math.abs(current - page) <= 2) {
			// 			return true
			// 		} else {
			// 			return false
			// 		}
			// 	})
			// 	.reduce((prev: number[], cur: number) => {
			// 		const last = prev[prev.length - 1]
			// 		return prev.concat(Math.abs(cur - last) > 1 ? [-1, cur] : [cur])
			// 	}, [])
			Math.random() > 0.5 ? [1, 2, 3, 4, 5, 6, 7] : [2, 3, 4, 5, 6, 7, 8]
		)
		props.onChange && props.onChange(current)
	}, [current])

	const changePage = (page: number, index: number) => {
		if (page === -1) {
			// 点左边...
			if (index === 1) {
				current - 5 > 1 ? setCurrent(current - 5) : setCurrent(1)
			} else {
				current + 5 < pageCount ? setCurrent(current + 5) : setCurrent(pageCount)
			}
		} else {
			setCurrent(page)
		}
	}
	console.log('hook fun')
	return (
		<ul className="hui-pagination">
			{/* <button onClick={() => current - 1 >= 1 && setCurrent(current - 1)}>←</button> */}
			<li title="上一页" className="hui-pagination-prev" onClick={() => current - 1 >= 1 && setCurrent(current - 1)}>
				<a className="hui-pagination-item-link">左边</a>
			</li>
			{arr.map((page, index) => (
				// <button key={index} onClick={() => changePage(page, index)} style={page === current ? { color: 'red' } : {}}>
				// 	{page === -1 ? '...' : page}
				// </button>
				<li
					key={`hui-pagination-item${index + 1}`}
					onClick={() => changePage(page, index)}
					className={classnames({ 'hui-pagination-item': true, 'hui-pagination-item-active': current === page })}
				>
					<a>{page === -1 ? '...' : page}</a>
				</li>
			))}
			{/* <button onClick={() => current + 1 <= pageCount && setCurrent(current + 1)}>></button> */}
			<li title="下一页" className="hui-pagination-next" onClick={() => current + 1 <= pageCount && setCurrent(current + 1)}>
				<a className="hui-pagination-item-link">右边</a>
			</li>
		</ul>
	)
}

export default Pagination
