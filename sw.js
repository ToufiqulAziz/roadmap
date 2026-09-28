const CACHE = "roadmap-v1";
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(["./", "./index.html", "./manifest.json", "./icon.svg"]);
    })
  );
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", function (e) {
  e.respondWith(
    fetch(e.request).catch(function () {
      return caches.match(e.request);
    })
  );
});
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(clients.openWindow("./index.html"));
});
