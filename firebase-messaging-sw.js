
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCB1gPJXybWGvJR3APcdUp98CMAPSyAVmo",
  authDomain: "funownernullnullprotejet.firebaseapp.com",
  databaseURL: "https://funownernullnullprotejet-default-rtdb.firebaseio.com",
  projectId: "funownernullnullprotejet",
  storageBucket: "funownernullnullprotejet.firebasestorage.app",
  messagingSenderId: "391038052290",
  appId: "1:391038052290:android:fe4c061fdede429644185b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  console.log("Background message:", payload);

  const title = payload.notification?.title || payload.data?.title || "FUN OWNER";
  const body = payload.notification?.body || payload.data?.body || "New notification";
  const icon = payload.notification?.icon || payload.data?.icon || "";
  const link = payload.fcmOptions?.link || payload.data?.link || "https://jahid9088.github.io/Notification-system/";

  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    badge: icon,
    data: {
      link: link
    }
  });
});

self.addEventListener("notificationclick", function(event){
  event.notification.close();

  const link = event.notification.data && event.notification.data.link
    ? event.notification.data.link
    : "https://jahid9088.github.io/Notification-system/";

  event.waitUntil(
    clients.matchAll({type:"window", includeUncontrolled:true}).then(function(clientList){
      for(const client of clientList){
        if(client.url === link && "focus" in client){
          return client.focus();
        }
      }
      if(clients.openWindow){
        return clients.openWindow(link);
      }
    })
  );
});
