importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyC4HC-mKj0NnlGPHzh11Ck7uqeBDfwVZOY",
    authDomain: "push-notification-9a77a.firebaseapp.com",
    projectId: "push-notification-9a77a",
    storageBucket: "push-notification-9a77a.firebasestorage.app",
    messagingSenderId: "1019442879465",
    appId: "1:1019442879465:web:258a3d8c75dcf90ca88978",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
