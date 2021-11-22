/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import '@avidian/extras';
import './boot';
import App from './App';
import './Styles/global.css';
import './Styles/animations.css';
import reportWebVitals from './reportWebVitals';
import './Libraries/firebase.library';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
