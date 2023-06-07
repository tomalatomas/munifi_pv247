import { useState } from 'react';

import { ReactComponent as ReactLogo } from './assets/react.svg';
import './App.css';
import getFormValues from './getFormValues';

const options: Intl.DateTimeFormatOptions = {
	hour12: true
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const values = getFormValues(e.target);
	alert(`Hello there ${values.name}`);
};

const App = () => {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer">
					<ReactLogo className="logo react" title="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				It&lsquo;s {new Date().toLocaleString(undefined, options).toUpperCase()}{' '}
				right now!
			</p>
			<form
				onSubmit={event => {
					handleSubmit(event);
				}}
			>
				<label>
					Name:
					<input type="text" placeholder="Your Name..." id="name" />
				</label>
				<input type="submit" value="Greet" />
			</form>
		</div>
	);
};

export default App;
