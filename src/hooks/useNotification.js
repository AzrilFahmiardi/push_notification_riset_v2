// This hooks work on localhost but not on production, i dont know why - azril


import { useState, useEffect } from 'react';
import { requestForToken, onMessageListener } from '../firebase/messaging';

export const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const [isTokenFound, setIsTokenFound] = useState(false);

  useEffect(() => {
    // Request permission and get token
    const fetchToken = async () => {
      const token = await requestForToken();
      if (token) {
        setIsTokenFound(true);
      }
    };
    
    fetchToken();
    
    // Set up notification listener
    const unsubscribe = onMessageListener().then((payload) => {
      console.log('Received notification:', payload);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
        data: payload.data
      });
      
      // Display browser notification if app is in background
      if (document.visibilityState === 'hidden') {
        try {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: '/favicon.ico'
          });
        } catch (error) {
          console.error('Error showing notification:', error);
        }
      }
    });
    
    // Request notification permission if not granted
    if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    
    return () => {
      // This is not a true unsubscribe function, but we'll use it as a placeholder
      // since Firebase doesn't provide a direct way to unsubscribe from onMessage
      unsubscribe.catch(err => console.error(err));
    };
  }, []);

  return { notification, isTokenFound };
};

export default useNotification;