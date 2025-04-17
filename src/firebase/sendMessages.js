// src/firebase/sendMessages.js
import admin from './admin';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

// Fungsi untuk mengambil semua token dari Firestore
export const getAllFCMTokens = async () => {
  try {
    const tokensRef = collection(db, 'fcmTokens');
    const snapshot = await getDocs(tokensRef);
    const tokens = [];
    
    snapshot.forEach((doc) => {
      tokens.push(doc.data().token);
    });
    
    return tokens;
  } catch (error) {
    console.error('Error getting FCM tokens:', error);
    return [];
  }
};

// Fungsi untuk mengirim pesan ke beberapa perangkat menggunakan Firebase Admin SDK
export const sendMulticastMessage = async (title, body, data = {}) => {
  try {
    // Dapatkan semua token FCM
    const tokens = await getAllFCMTokens();
    
    if (tokens.length === 0) {
      console.log('No FCM tokens found');
      return { success: false, message: 'No tokens found' };
    }
    
    // Buat pesan notifikasi
    const message = {
      notification: {
        title,
        body
      },
      data,
      tokens: tokens // Array token perangkat
    };
    
    // Kirim pesan multicast menggunakan Firebase Admin SDK
    const response = await admin.messaging().sendMulticast(message);
    
    console.log('FCM Multicast Response:', response);
    return {
      success: true,
      message: `Message sent to ${tokens.length} devices. Successful: ${response.successCount}, Failed: ${response.failureCount}`,
      response: {
        successCount: response.successCount,
        failureCount: response.failureCount
      }
    };
    
  } catch (error) {
    console.error('Error sending multicast message:', error);
    return {
      success: false,
      message: error.message
    };
  }
};