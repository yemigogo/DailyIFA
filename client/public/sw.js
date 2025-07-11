// Service Worker for Ifá Daily App Offline Mode
const CACHE_NAME = 'ifa-daily-v1';
const OFFLINE_CACHE = 'ifa-offline-v1';

// Essential resources to cache immediately
const ESSENTIAL_RESOURCES = [
  '/',
  '/learning',
  '/static/css/app.css',
  '/static/js/app.js',
  '/static/images/placeholder-odu.svg'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching essential resources');
        return cache.addAll(ESSENTIAL_RESOURCES);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle static resources
  if (url.pathname.startsWith('/static/')) {
    event.respondWith(handleStaticResource(request));
    return;
  }
  
  // Handle page requests
  event.respondWith(handlePageRequest(request));
});

// Handle API requests with offline fallback
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, checking cache for', url.pathname);
    
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for specific endpoints
    return getOfflineFallback(url.pathname);
  }
}

// Handle static resources with cache-first strategy
async function handleStaticResource(request) {
  try {
    // Check cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fetch from network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to fetch static resource', request.url);
    
    // Return placeholder for images
    if (request.url.includes('.png') || request.url.includes('.jpg') || request.url.includes('.svg')) {
      return caches.match('/static/images/placeholder-odu.svg');
    }
    
    return new Response('Resource not available offline', { status: 404 });
  }
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful page responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for page', request.url);
    
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    return caches.match('/');
  }
}

// Generate offline fallback responses
function getOfflineFallback(pathname) {
  if (pathname.includes('/api/odu')) {
    return new Response(JSON.stringify({
      error: 'Offline Mode',
      message: 'This data is not available offline. Please download offline resources when connected.',
      offline: true
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 503
    });
  }
  
  if (pathname.includes('/api/offline')) {
    return new Response(JSON.stringify({
      error: 'Network Required',
      message: 'Internet connection required to download offline resources.',
      offline: true
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 503
    });
  }
  
  return new Response(JSON.stringify({
    error: 'Service Unavailable',
    message: 'This service is not available offline.',
    offline: true
  }), {
    headers: { 'Content-Type': 'application/json' },
    status: 503
  });
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'CACHE_RESOURCE':
      cacheResource(data.url, data.response);
      break;
      
    case 'CLEAR_CACHE':
      clearCache();
      break;
      
    case 'GET_CACHE_STATUS':
      getCacheStatus().then(status => {
        event.ports[0].postMessage(status);
      });
      break;
      
    default:
      console.log('Service Worker: Unknown message type', type);
  }
});

// Cache a specific resource
async function cacheResource(url, responseData) {
  try {
    const cache = await caches.open(OFFLINE_CACHE);
    const response = new Response(responseData, {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(url, response);
    console.log('Service Worker: Cached resource', url);
  } catch (error) {
    console.error('Service Worker: Failed to cache resource', url, error);
  }
}

// Clear all caches
async function clearCache() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('Service Worker: All caches cleared');
  } catch (error) {
    console.error('Service Worker: Failed to clear cache', error);
  }
}

// Get cache status
async function getCacheStatus() {
  try {
    const cacheNames = await caches.keys();
    const status = {};
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      status[cacheName] = {
        name: cacheName,
        size: keys.length,
        resources: keys.map(request => request.url)
      };
    }
    
    return status;
  } catch (error) {
    console.error('Service Worker: Failed to get cache status', error);
    return {};
  }
}