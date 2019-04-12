import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import './style.less'
const { useState, useEffect, useRef } = React
interface IProps {
	message: React.ReactNode
	description?: React.ReactNode
	duration?: number
	onClose?: () => void
	onDestroy?: () => void
}

interface Istate {
	duration: number
	isShow: boolean
	isHide: boolean
}
/**
 * 引入notification就添加notificationContainer
 */
;(() => {
	const div = document.createElement('div')
	div.classList.add('notification-container')
	document.body.appendChild(div)
})()

/**
 * 可复用的  只关注内部的notification component
 */
function NotificationComponent(props: IProps) {
	let timer: NodeJS.Timer
	const myRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
	let isClickClose = false
	const duration = props.duration || 3

	const [isShow, setIsShow] = useState(false)
	const [isHide, setIsHide] = useState(false)
	const eventFn: (e: AnimationEvent) => void = (e: AnimationEvent) => {
		// 进入动画回调
		if (e.animationName === 'show') {
			console.log('显示动画')
			timer = setTimeout(() => {
				setIsShow(false)
				setIsHide(true)
			}, duration * 1000)
		}
		// 消失动画回调
		else if (e.animationName === 'hide') {
			console.log('消失动画')
			props.onDestroy && props.onDestroy()
		}
	}

	useEffect(() => {
		myRef.current && myRef.current.addEventListener('animationend', eventFn)
		setIsShow(true)
		return () => {
			if (isClickClose) {
				props.onClose && props.onClose()
				isClickClose = false
			}
			clearTimeout(timer)
			myRef.current && myRef.current.removeEventListener('animationend', eventFn)
		}
	}, [])

	const handleClose = () => {
		console.log('handleClose')
		isClickClose = true
		setIsShow(false)
		setIsHide(true)
	}

	return (
		<div className={classNames({ 'notification-box': true, show: isShow, hide: isHide })} ref={myRef}>
			<div className="notification-message">{props.message}</div>
			<div className="notification-description">{props.description}</div>
			<a className="notification-close" onClick={handleClose}>
				×
			</a>
		</div>
	)
}

/**
 * 处理notification component与外部的交互   挂载 删除实例等
 * @param props
 */
function init(props: IProps) {
	// 挂载组件
	const div = document.createElement('div')
	;(document.querySelector('.notification-container') as HTMLElement).appendChild(div)

	// 销毁实例  删除节点
	function handleDestroy() {
		ReactDOM.unmountComponentAtNode(div)
		console.log('删除实例')
		;(document.querySelector('.notification-container') as HTMLElement).removeChild(div)
	}

	// 渲染组件
	ReactDOM.render(<NotificationComponent {...props} onDestroy={handleDestroy} />, div)
}

const api = {
	open(props: IProps) {
		init(props)
	}
	// 扩展其他api
}

export default api
