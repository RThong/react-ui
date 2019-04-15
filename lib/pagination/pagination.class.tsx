import React from 'react'
import './style.scss'
import classnames from 'classnames'

interface Props {
	current: number
	pageSize: number
	total: number
	onChange?: (page: number) => void
}

class Pagination extends React.Component<Props> {
	static defaultProps = {
		total: 0,
		pageSize: 10,
		current: 1
	}

	state = {
		current: this.props.current
	}
	private pageCount = Math.ceil(this.props.total / this.props.pageSize)

	get arr() {
		const pageCount = this.pageCount
		const current = this.state.current
		console.log('class get:', current)

		return Array(this.pageCount)
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
	}

	changePage(page: number, index: number) {
		const current = this.state.current
		if (page === -1) {
			// 点左边...,左边的...index永远是1
			if (index === 1) {
				current - 5 > 1
					? this.setState({
							current: current - 5
					  })
					: this.setState({
							current: 1
					  })
			} else {
				current + 5 < this.pageCount
					? this.setState({
							current: current + 5
					  })
					: this.setState({
							current: this.pageCount
					  })
			}
		} else {
			this.setState({
				current: page
			})
		}
	}

	render() {
		console.log('class render')
		const current = this.state.current
		return (
			<ul className="hui-pagination">
				<li title="上一页" className="hui-pagination-prev" onClick={() => current - 1 >= 1 && this.setState({ current: current - 1 })}>
					<a className="hui-pagination-item-link">左边</a>
				</li>
				{this.arr.map((page, index) => (
					<li
						key={`hui-pagination-item${index + 1}`}
						onClick={() => this.changePage(page, index)}
						className={classnames({ 'hui-pagination-item': true, 'hui-pagination-item-active': current === page })}
					>
						<a>{page === -1 ? '...' : page}</a>
					</li>
				))}
				<li title="下一页" className="hui-pagination-next" onClick={() => current + 1 <= this.pageCount && this.setState({ current: current + 1 })}>
					<a className="hui-pagination-item-link">右边</a>
				</li>
			</ul>
		)
	}
}

export default Pagination
