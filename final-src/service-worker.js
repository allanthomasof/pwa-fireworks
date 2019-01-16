const cacheName = `nomeDoCache`;

self.addEventListener('install', e => {
    // SW baixado e instalado
    // Passo 1 é cachear o App Shell
    // Preparar a app para funcionar Offline

    // Cacheando o App Shell
    e.waitUntil(
        caches.open(cacheName).then(cache => {
        return cache.addAll([
            `/`,
            `/index.html`,
            `/css/fireworks.css`,
            `/js/fireworks.js`,
            `/js/requestanimframe.js`,
        ])
            .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    // SW está instalado e ativo
    // Podemos terminar o setup
    // Ou limpar o cache antigo
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // Escuta cada evento
    // E faz alguma coisa para cada request
    // feito da app para API server
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
        return response || fetch(event.request);
        })
    );
});