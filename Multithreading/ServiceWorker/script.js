// Check if service worker is supported
if ('serviceWorker' in navigator) {
  // Register service worker
  navigator.serviceWorker
    .register('serviceWorker.js')
    .then(function (registration) {
      // Service worker registration successful
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function (error) {
      // Service worker registration failed
      console.log('Service Worker registration failed:', error);
    });
}
