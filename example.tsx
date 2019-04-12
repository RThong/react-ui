import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import IconExample from './lib/icon/icon.example'
import ButtonExample from './lib/button/button.example'
import PaginationExmple from './lib/pagination/pagination.example'
ReactDOM.render(
	<div>
		<Router>
			<header>
				<div>hong-ui.</div>
			</header>
			<div>
				<aside>
					<h2>组件</h2>
					<ul>
						<li>
							<Link to="/icon">Icon</Link>
						</li>
						<li>
							<Link to="/button">Button</Link>
						</li>
						<li>
							<Link to="/pagination">Pagination</Link>
						</li>
					</ul>
				</aside>
				<main>
					<Route path="/icon" component={IconExample} />
					<Route path="/button" component={ButtonExample} />
					<Route path="/pagination" component={PaginationExmple} />
				</main>
			</div>
		</Router>
	</div>,
	document.querySelector('#root')
)
