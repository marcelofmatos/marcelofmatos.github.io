// Service Worker para o site do Marcelo Matos
// Versão 2.0 - Cache otimizado e performance

const CACHE_NAME = 'marcelo-matos-v2.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css',
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('🚀 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Service Worker: Cache criado');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('❌ Erro ao criar cache:', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Remove caches antigos
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna do cache se disponível
                if (response) {
                    console.log('📁 Cache hit:', event.request.url);
                    return response;
                }
                
                // Senão, faz a requisição à rede
                console.log('🌐 Network request:', event.request.url);
                return fetch(event.request)
                    .then((response) => {
                        // Verifica se a resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clona a resposta para cache
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch((error) => {
                        console.error('❌ Fetch error:', error);
                        
                        // Retorna uma resposta offline personalizada para HTML
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Eventos de sincronização em background (para futuras implementações)
self.addEventListener('sync', (event) => {
    console.log('🔄 Background Sync:', event.tag);
    
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Aqui poderia sincronizar formulários offline
            console.log('📧 Sincronizando formulários de contato...')
        );
    }
});

// Notificações push (para futuras implementações)
self.addEventListener('push', (event) => {
    console.log('📬 Push notification recebida:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'Nova mensagem do site!',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver site',
                icon: '/assets/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '/assets/icons/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Marcelo Matos - Portfolio', options)
    );
});

// Clique em notificações
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Notification click:', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
    console.log('💬 Mensagem recebida:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('🎯 Service Worker do Marcelo Matos carregado!');
console.log('⚡ Performance otimizada');
console.log('📱 Funcionalidades offline ativadas');
console.log('🔄 Cache inteligente configurado');