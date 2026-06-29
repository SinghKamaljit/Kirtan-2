const CACHE_NAME = 'gurbani-tutor-v23';
const urlsToCache = [
'./', './index.html', './manifest.json',
'./icon-192.png', './icon-512.png',
'./1.jpg', './1.m4a'
];
self.addEventListener('install', e => {
e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
self.skipWaiting();
});
self.addEventListener('activate', e => {
e.waitUntil(caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
));
});
self.addEventListener('fetch', e =>
e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
