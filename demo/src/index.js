import React from 'react';
import { render } from 'react-dom';

import Fetch from '../../src';

const Box = props => (
	<div style={{ float: 'left', width: `${100 / 4}%` }}>
		{props.children}
	</div>
);

const AsyncList = props => (
	<Fetch
		onLoading={() => <p>Loading...</p>}
		onSuccess={data => (
			<ul>
				{data.map(post => (
					<li key={post.id}>
						{post.title}
					</li>
				))}
			</ul>
		)}
		onError={(error, reload) => (
			<div>
				<p>
					Error!
				</p>
				<pre>
					{error.message}
				</pre>
				<button onClick={e => reload(props)}>Reload?</button>
			</div>
		)}
		{...props}
	/>
);

let Demo = props => (
	<div>
		<Box>
			<h1>onSuccess</h1>
			<AsyncList url={'https://jsonplaceholder.typicode.com/posts'} />
		</Box>
		<Box>
			<h1>onError</h1>
			<AsyncList
				url={'https://jsonplaceholder.typicode.com/poss'}
				onError={(error, reload) => (
					<div>
						<p>
							Error!
						</p>
						<pre>
							{error.message}
						</pre>
						<button
							onClick={e =>
								reload({
									...props,
									url: 'https://jsonplaceholder.typicode.com/posts',
								})}
						>
							Reload?
						</button>
					</div>
				)}
			/>
		</Box>
		<Box>
			<h1>onLoading</h1>
			<AsyncList />
		</Box>
		<Box>
			<h1>With Children</h1>
			<AsyncList url={'https://jsonplaceholder.typicode.com/posts'}>
				{data => <pre>{JSON.stringify(data, null, 2)}</pre>}
			</AsyncList>
		</Box>
	</div>
);

render(<Demo />, document.querySelector('#demo'));
