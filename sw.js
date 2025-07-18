// Nombre del caché
const CACHE_NAME = 'finanzas-app-cache-v1';
// Archivos a guardar en caché para que la app funcione offline
const urlsToCache = [
  '/',
  '/index.html', // Asume que tu archivo se llama index.html
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Evento 'install': se dispara cuando el Service Worker se instala
self.addEventListener('install', event => {
  // Espera a que el caché se abra y guarda los archivos
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la app pide un recurso (imagen, script, etc.)
self.addEventListener('fetch', event => {
  event.respondWith(
    // Intenta encontrar el recurso en el caché
    caches.match(event.request)
      .then(response => {
        // Si se encuentra en caché, lo devuelve.
        if (response) {
          return response;
        }
        // Si no, lo pide a la red.
        return fetch(event.request);
      }
    )
  );
});
