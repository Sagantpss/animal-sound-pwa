self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('animal-sounds-v1').then(cache => {
      return cache.addAll([
        'index.html',
        'style.css',
        'script.js',
        'manifest.json',
        'sounds/cat.mp3',
        'sounds/dog.mp3',
        'sounds/cow.mp3',
        'sounds/lion.mp3'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
