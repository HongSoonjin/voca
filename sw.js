// 인터넷이 되면 항상 최신 파일을 쓰고, 안 될 때만 저장해 둔 파일을 씁니다.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const c = r.clone();
      caches.open('soeunkok-v1').then(x => x.put(e.request, c));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
