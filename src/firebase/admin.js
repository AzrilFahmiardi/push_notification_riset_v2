import admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json';
require('dotenv').config(); // pastikan dotenv dipanggil dulu


let serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
