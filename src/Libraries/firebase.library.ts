import firebase from 'firebase';

export const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const analytics = firebase.analytics(app);

export const storage = firebase.storage();

// Setup

app.auth().useDeviceLanguage();

app.firestore().enablePersistence().catch(console.error);
