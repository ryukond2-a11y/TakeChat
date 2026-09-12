importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js","https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js");
firebase.initializeApp({
 apiKey:"REPLACE_API_KEY",
 authDomain:"REPLACE_AUTH_DOMAIN",
 projectId:"REPLACE_PROJECT_ID",
 storageBucket:"REPLACE_STORAGE_BUCKET",
 messagingSenderId:"REPLACE_MESSAGING_SENDER_ID",
 appId:"REPLACE_APP_ID"
});
const messaging=firebase.messaging();
messaging.onBackgroundMessage(payload=>{
 const n=payload.notification||{};
 self.registration.showNotification(n.title||"TakeChat",{body:n.body||"新しいメッセージがあります",icon:"/icon-192.png",data:{url:"/chat"}});
});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs){if("focus"in c)return c.focus()}return clients.openWindow("/chat")}))});