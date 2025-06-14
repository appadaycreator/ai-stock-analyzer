const CACHE_NAME = 'ai-stock-analyzer-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/privacy-policy.html',
  '/terms.html',
  '/contact.html',
  '/stocks.html',
  '/manifest.json',
  '/styles.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          fetch(url)
            .then(response => {
              if (!response.ok) throw new Error('Request failed');
              return cache.put(url, response);
            })
            .catch(err => console.error('Failed to cache', url, err))
        )
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
