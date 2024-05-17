// Cache name
const CACHE_NAME = 'offline-cache';

// List of files to cache
const urlsToCache = ['/', 'index.html', 'styles.css', 'script.js'];

// Install service worker and cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached resources when offline
// The fetch event is triggered for every network request.
self.addEventListener('fetch', function (event) {
  // event.respondWith intercepts the network request and provides a custom response.
  event.respondWith(
    // caches.match() checks if the requested resource is available in the cache.
    caches.match(event.request).then(function (response) {
      // If the resource is found in the cache, it returns the cached response.
      if (response) {
        return response;
      }

      // If not, it fetches the resource from the network, caches it, and returns it.

      // Clone the request since it's a one-time-use stream
      let fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response since it's a one-time-use stream
        let responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
