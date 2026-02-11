// Service Worker - Uygulama kapalıyken bildirim için
const CACHE_NAME = 'akademik-asistan-v3';
const urlsToCache = [
  '/akademik_asistan_v3.html',
  '/manifest.json'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Push Notification
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Akademik Asistan';
  const options = {
    body: data.body || 'Yeni bir etkinlik yaklaşıyor!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.tag || 'notification',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: data
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/akademik_asistan_v3.html')
  );
});

// Background Sync için hazırlık
self.addEventListener('sync', event => {
  if (event.tag === 'sync-tasks') {
    event.waitUntil(syncTasks());
  }
});

async function syncTasks() {
  // Görevleri senkronize et
  console.log('Syncing tasks...');
}
