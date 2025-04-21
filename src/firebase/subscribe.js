// subscribe.js
import admin from './admin.js';
import { getAllFCMTokens } from './sendMessages.js';

const subscribeToTopic = async (topicName = 'broadcast') => {
  try {
    const tokens = await getAllFCMTokens();

    if (tokens.length === 0) {
      console.log('No tokens to subscribe');
      return;
    }

    const response = await admin.messaging().subscribeToTopic(tokens, topicName);
    console.log(`Successfully subscribed to topic "${topicName}":`, response);
  } catch (error) {
    console.error('Error subscribing to topic:', error);
  }
};

