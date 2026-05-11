const CACHE_NAME = "amor-app-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  "./img/icon-192.png",
  "./img/icon-512.png",

  "./music/song1.mp3",
  "./music/song2.mp3",
  "./music/song3.mp3"
];

/* 📦 INSTALL */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* 🔄 ACTIVATE */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* 🌐 FETCH */
self.addEventListener("fetch", (event) => {

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).catch(() => {
        // fallback simple si no hay internet
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );

});