import React from 'react'
// import '../../icons/wechat.svg'
import './importIcons'
import './icon.scss'
import classnames from '..//helper/classnames'

interface IconProps extends React.HTMLAttributes<HTMLElement> {
	type: string
}

const Icon: React.FunctionComponent<IconProps> = props => {
	const { className, ...restProps } = props
	// 拼接获取到的class
	const tempClass = className ? classnames('hong-icon', ...className.split(' ')) : `hong-icon`
	return (
		<i className={tempClass} {...restProps}>
			<svg>
				<use xlinkHref={`#${props.type}`} />
			</svg>
		</i>
	)
}

export default Icon
