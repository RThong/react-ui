import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import './style.less'
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
class NotificationComponent extends React.Component<IProps, Istate> {
	public readonly state: Istate = {
		duration: this.props.duration || 3,
		isShow: false,
		isHide: false
	}
	private timer: number
	private myRef: React.RefObject<HTMLDivElement> = React.createRef()
	private eventFn: (e: AnimationEvent) => void
	private isClickClose = false

	constructor(props: IProps) {
		super(props)
	}

	public handleClose = () => {
		console.log('handleClose')
		this.isClickClose = true
		this.setState({
			isShow: false,
			isHide: true
		})
	}

	public componentDidMount() {
		this.eventFn = (e: AnimationEvent) => {
			// 进入动画回调
			if (e.animationName === 'show') {
				console.log('显示动画')
				this.timer = window.setTimeout(() => {
					this.setState({
						isShow: false,
						isHide: true
					})
				}, this.state.duration * 1000)
			}
			// 消失动画回调
			else if (e.animationName === 'hide') {
				console.log('消失动画')
				this.props.onDestroy && this.props.onDestroy()
			}
		}
		this.myRef.current && this.myRef.current.addEventListener('animationend', this.eventFn)
		this.setState({
			isShow: true
		})
	}

	public componentWillUnmount() {
		if (this.isClickClose) {
			this.props.onClose && this.props.onClose()
			this.isClickClose = false
		}
		clearTimeout(this.timer)
		this.myRef.current && this.myRef.current.removeEventListener('animationend', this.eventFn)
	}

	public render() {
		return (
			<div className={classNames({ 'notification-box': true, show: this.state.isShow, hide: this.state.isHide })} ref={this.myRef}>
				<div className="notification-message">{this.props.message}</div>
				<div className="notification-description">{this.props.description}</div>
				<a className="notification-close" onClick={this.handleClose}>
					×
				</a>
			</div>
		)
	}
}

/**
 * 处理notification component与外部的交互   挂载 删除实例等
 * @param props
 */
function init(props: IProps) {
	// 拿到当前的notification实例
	// let notification: NotificationComponent

	const ref: React.RefObject<NotificationComponent> = React.createRef()

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
	ReactDOM.render(<NotificationComponent {...props} ref={ref} onDestroy={handleDestroy} />, div)

	// notification = ref.current as NotificationComponent
}

const api = {
	open(props: IProps) {
		init(props)
	}
	// 扩展其他api
}

export default api
