// service-worker.js

const cacheName = 'my-pwa-cache-v1';


const resourcesToCache = [

  'beer.html',
  'script.js',
  'addbeer.html',
    'style.css',

    'images/favicon-32x32.png',
    'images/favicon-16x16.png',
    'images/apple-touch-icon.png',
    'images/android-chrome-192x192.png',
    'images/android-chrome-512x512.png',
    'images/favicon.ico',
    'images/mstile-150x150.png',
    
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(resourcesToCache);
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


        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});