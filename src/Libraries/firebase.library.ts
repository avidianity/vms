import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import { DEVELOPMENT, PRODUCTION } from '../constants';

export const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const analytics = app.analytics();

export const storage = app.storage();

export const firestore = app.firestore();

if (DEVELOPMENT) {
	app.firestore().useEmulator('localhost', 8080);
	storage.useEmulator('localhost', 9199);
}

if (PRODUCTION) {
	firestore.enablePersistence().catch(console.error);
}
