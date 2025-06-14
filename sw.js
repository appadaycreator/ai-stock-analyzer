const CACHE_NAME = 'ai-stock-analyzer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn1.genspark.ai/user-upload-image/22_generated/415a2486-eefe-4e49-a887-aade6346d6dd',
  'https://cdn1.genspark.ai/user-upload-image/22_generated/0ebc5aa4-f439-448f-afeb-80a978c508a7'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});