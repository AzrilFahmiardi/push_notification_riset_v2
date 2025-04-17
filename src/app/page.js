'use client';

import { useEffect } from 'react';
import { onMessageListener } from '../firebase/messaging';
import { useNotification } from '../hooks/useNotification';
import SendNotification from './components/sendNotification';

export default function Page() {
  const notification = useNotification(); // Menggunakan hook untuk menangani requestForToken

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((err) => {
          console.log('SW registration failed:', err);
        });
    }

    onMessageListener()
      .then((payload) => {
        console.log('Received in foreground:', payload);
        alert(payload.notification.title);
      })
      .catch((err) => console.log('onMessage error:', err));
  }, []);

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Firebase FCM Demo</h1>
      <SendNotification />
    </main>
  );
}