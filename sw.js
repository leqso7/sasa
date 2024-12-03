const CACHE_NAME = 'class-manager-v1';
const urlsToCache = [
  '/sasa/',
  '/sasa/index.html',
  '/sasa/manifest.json',
  '/sasa/icon-192x192.png',
  '/sasa/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
