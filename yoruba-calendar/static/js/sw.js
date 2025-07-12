// Service Worker for Odún Calendar Push Notifications

const CACHE_NAME = 'odun-calendar-v1';
const urlsToCache = [
    '/',
    '/static/css/main.css',
    '/static/css/admin.css',
    '/static/js/app.js',
    '/static/js/calendar.js',
    '/static/js/push.js',
    '/static/images/icon-192.png',
    '/static/images/icon-512.png'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker installing');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Push event
self.addEventListener('push', (event) => {
    console.log('Push event received:', event);
    
    let notificationData = {
        title: 'Odún Calendar',
        body: 'You have a new notification',
        icon: '/static/images/icon-192.png',
        badge: '/static/images/badge-72.png',
        tag: 'default'
    };
    
    if (event.data) {
        try {
            const data = event.data.json();
            notificationData = {
                ...notificationData,
                ...data
            };
        } catch (error) {
            console.error('Error parsing push data:', error);
            notificationData.body = event.data.text();
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            badge: notificationData.badge,
            tag: notificationData.tag,
            requireInteraction: false,
            actions: [
                {
                    action: 'view',
                    title: 'View',
                    icon: '/static/images/view-icon.png'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss',
                    icon: '/static/images/dismiss-icon.png'
                }
            ],
            data: {
                url: notificationData.url || '/',
                timestamp: Date.now()
            }
        })
    );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    const action = event.action;
    const notificationData = event.notification.data;
    
    if (action === 'dismiss') {
        // Just close the notification
        return;
    }
    
    // Default action or 'view' action
    const urlToOpen = notificationData?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if there's already a window/tab open with the target URL
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // If no window/tab is open, open a new one
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Notification close event
self.addEventListener('notificationclose', (event) => {
    console.log('Notification closed:', event);
    
    // Track notification dismissal if needed
    const notificationData = event.notification.data;
    if (notificationData?.trackDismissal) {
        // Send dismissal event to analytics
        fetch('/api/notification-dismissed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tag: event.notification.tag,
                timestamp: Date.now()
            })
        }).catch(error => {
            console.error('Failed to track notification dismissal:', error);
        });
    }
});

// Background sync event (for offline functionality)
self.addEventListener('sync', (event) => {
    console.log('Background sync:', event);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Background sync function
async function doBackgroundSync() {
    try {
        // Sync any pending data when connection is restored
        const pendingData = await getPendingData();
        
        for (const data of pendingData) {
            await fetch('/api/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        }
        
        await clearPendingData();
        console.log('Background sync completed');
        
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Get pending data from IndexedDB
async function getPendingData() {
    // This would integrate with IndexedDB to get offline stored data
    return [];
}

// Clear pending data
async function clearPendingData() {
    // This would clear synced data from IndexedDB
}

// Message event (for communication with main thread)
self.addEventListener('message', (event) => {
    console.log('Service Worker received message:', event);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Periodic background sync (experimental)
self.addEventListener('periodicsync', (event) => {
    console.log('Periodic sync:', event);
    
    if (event.tag === 'daily-sync') {
        event.waitUntil(performDailySync());
    }
});

// Daily sync function
async function performDailySync() {
    try {
        // Fetch today's calendar data
        const response = await fetch('/api/today');
        const data = await response.json();
        
        // Cache today's data
        const cache = await caches.open(CACHE_NAME);
        await cache.put('/api/today', new Response(JSON.stringify(data)));
        
        // Show daily notification if enabled
        const notificationTitle = `Today's Orisha: ${data.orisha}`;
        const notificationBody = data.theme;
        
        await self.registration.showNotification(notificationTitle, {
            body: notificationBody,
            icon: '/static/images/icon-192.png',
            badge: '/static/images/badge-72.png',
            tag: 'daily-orisha',
            requireInteraction: false,
            data: {
                url: '/dashboard',
                type: 'daily-orisha'
            }
        });
        
        console.log('Daily sync completed');
        
    } catch (error) {
        console.error('Daily sync failed:', error);
    }
}

// Error handling
self.addEventListener('error', (event) => {
    console.error('Service Worker error:', event);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker unhandled rejection:', event);
});

console.log('Service Worker loaded');