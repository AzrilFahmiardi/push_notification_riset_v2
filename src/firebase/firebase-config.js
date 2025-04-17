import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4HC-mKj0NnlGPHzh11Ck7uqeBDfwVZOY",
    authDomain: "push-notification-9a77a.firebaseapp.com",
    projectId: "push-notification-9a77a",
    storageBucket: "push-notification-9a77a.firebasestorage.app",
    messagingSenderId: "1019442879465",
    appId: "1:1019442879465:web:258a3d8c75dcf90ca88978",
    measurementId: "G-KL47TK8QF3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };