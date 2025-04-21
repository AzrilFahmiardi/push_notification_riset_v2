import admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json';

let serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
