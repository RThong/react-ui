import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import './style.less'

const Pagination: React.FunctionComponent = () => {
	const total = 100
	const pageSize = 10
	const pageCount = Math.ceil(total / pageSize)
	const [current, setCurrent] = useState<number>(3)
	const [arr, setArr] = useState<number[]>([])

	useEffect(() => {
		setArr(
			Array(pageCount)
				.fill(undefined)
				.map((item, index) => index + 1)
				.filter(page => {
					if (page === 1 || page === pageCount) {
						return true
					} else if (Math.abs(current - page) <= 2) {
						return true
					} else {
						return false
					}
				})
				.reduce((prev: number[], cur: number) => {
					const last = prev[prev.length - 1]
					return prev.concat(Math.abs(cur - last) > 1 ? [-1, cur] : [cur])
				}, [])
		)
	}, [current])
	setTimeout(() => {
		setCurrent(6)
	}, 2000)
	return (
		<div>
			<button>←</button>
			{arr.map((page, index) => (
				<button key={index}>{page === -1 ? '...' : page}</button>
			))}
			<button>></button>
		</div>
	)
}

export default Pagination
