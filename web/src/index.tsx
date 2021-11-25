import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import './assets/css/material-dashboard.css';
import 'toastr/build/toastr.css';
import axios from 'axios';
import { SERVER_URL } from './constants';
import toastr from 'toastr';

window.toastr = toastr;

axios.defaults.baseURL = SERVER_URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.get(`${SERVER_URL}/sanctum/csrf-cookie`);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
	serviceWorkerRegistration.register();
	reportWebVitals(console.log);
} else {
	serviceWorkerRegistration.unregister();
}
