// src/firebase/messaging.js
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import {app} from './firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase-config';

let messaging;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    } else {
      console.warn('Firebase messaging is not supported in this browser.');
    }
  });
}

export const requestForToken = async () => {
  try {
    if (!messaging) return;

    const token = await getToken(messaging, {
      vapidKey: 'BLgF0m1owLtGzhWqxTCz6MOsPdiFEsa3QGtIANWgWVgcJwS5Xr5lui3A9M0IC8ekHPdblcv8dnDjyj1vKeF8X1s',
    });

    if (token) {
      console.log('FCM Token:', token);
      // Simpan token ke Firestore
      const tokenRef = doc(db, 'fcmTokens', token);
      await setDoc(tokenRef, { token, createdAt: new Date() });

      console.log('Token saved to Firestore');

      // Subscribe ke topik "broadcast"
      await fetch('/api/subscribe-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, topic: 'broadcast' })
      });

      console.log('Subscribed to topic: broadcast');

      return token
    } else {
      console.log('No registration token available.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });
