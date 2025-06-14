const CACHE_NAME = 'ai-stock-analyzer-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/privacy-policy.html',
  '/terms.html',
  '/contact.html',
  '/manifest.json',
  '/styles.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
