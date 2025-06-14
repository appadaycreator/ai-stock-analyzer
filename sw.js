const CACHE_NAME = 'ai-stock-analyzer-v3';
const urlsToCache = [
  './',
  './index.html',
  './privacy-policy.html',
  './terms.html',
  './contact.html',
  './stocks.html',
  './manifest.json',
  './styles.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Service Worker install failed:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
