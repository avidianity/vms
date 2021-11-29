import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import './assets/css/material-dashboard.css';
import './styles/toastr.css';
import axios from 'axios';
import { SERVER_URL } from './constants';
import toastr from 'toastr';
import State from '@avidian/state';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'react-quill/dist/quill.snow.css';

dayjs.extend(relativeTime);

window.toastr = toastr;

const state = new State();

axios.defaults.baseURL = `${SERVER_URL}/api/v1`;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

if (state.has('token')) {
	const token = state.get<string>('token');
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

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
