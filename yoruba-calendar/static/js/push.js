// Push Notification JavaScript for Odún Calendar

// Push notification manager
const PushManager = {
    registration: null,
    subscription: null,
    isSupported: false,
    permission: 'default',
    
    // Initialize push notifications
    async init() {
        this.checkSupport();
        if (this.isSupported) {
            await this.registerServiceWorker();
            await this.checkPermission();
            this.setupUI();
        }
        console.log('Push notification manager initialized');
    },
    
    // Check if push notifications are supported
    checkSupport() {
        this.isSupported = 'serviceWorker' in navigator && 
                          'PushManager' in window && 
                          'Notification' in window;
        
        if (!this.isSupported) {
            console.warn('Push notifications not supported in this browser');
            this.showUnsupportedMessage();
        }
    },
    
    // Register service worker
    async registerServiceWorker() {
        try {
            this.registration = await navigator.serviceWorker.register('/static/js/sw.js', {
                scope: '/'
            });
            
            console.log('Service Worker registered:', this.registration);
            
            // Listen for service worker updates
            this.registration.addEventListener('updatefound', () => {
                console.log('Service Worker update found');
            });
            
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    },
    
    // Check notification permission
    async checkPermission() {
        this.permission = Notification.permission;
        
        if (this.permission === 'default') {
            this.showPermissionPrompt();
        } else if (this.permission === 'granted') {
            await this.subscribeToPush();
        } else {
            this.showPermissionDenied();
        }
    },
    
    // Request notification permission
    async requestPermission() {
        try {
            this.permission = await Notification.requestPermission();
            
            if (this.permission === 'granted') {
                App.showNotification('Notifications enabled! You\'ll receive spiritual reminders.', 'success');
                await this.subscribeToPush();
                this.updateUI();
            } else {
                this.showPermissionDenied();
            }
        } catch (error) {
            console.error('Permission request failed:', error);
        }
    },
    
    // Subscribe to push notifications
    async subscribeToPush() {
        if (!this.registration) {
            console.error('Service Worker not registered');
            return;
        }
        
        try {
            // Check if already subscribed
            const existingSubscription = await this.registration.pushManager.getSubscription();
            if (existingSubscription) {
                this.subscription = existingSubscription;
                console.log('Already subscribed to push notifications');
                return;
            }
            
            // Create new subscription
            const vapidPublicKey = this.getVapidPublicKey();
            this.subscription = await this.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
            });
            
            // Send subscription to server
            await this.sendSubscriptionToServer();
            console.log('Successfully subscribed to push notifications');
            
        } catch (error) {
            console.error('Push subscription failed:', error);
            App.showNotification('Failed to enable push notifications', 'error');
        }
    },
    
    // Send subscription to server
    async sendSubscriptionToServer() {
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.subscription)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save subscription');
            }
            
            console.log('Subscription saved to server');
        } catch (error) {
            console.error('Failed to save subscription:', error);
        }
    },
    
    // Unsubscribe from push notifications
    async unsubscribe() {
        if (this.subscription) {
            try {
                await this.subscription.unsubscribe();
                this.subscription = null;
                
                // Notify server
                await fetch('/api/unsubscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                App.showNotification('Push notifications disabled', 'info');
                this.updateUI();
                
            } catch (error) {
                console.error('Unsubscribe failed:', error);
            }
        }
    },
    
    // Get VAPID public key
    getVapidPublicKey() {
        // This would be provided by your server configuration
        return window.VAPID_PUBLIC_KEY || 'your-vapid-public-key-here';
    },
    
    // Convert VAPID key to Uint8Array
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    },
    
    // Setup UI elements
    setupUI() {
        this.createNotificationToggle();
        this.createTestButton();
        this.updateUI();
    },
    
    // Create notification toggle
    createNotificationToggle() {
        const toggle = document.querySelector('#notification-toggle');
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.requestPermission();
                } else {
                    this.unsubscribe();
                }
            });
        }
    },
    
    // Create test notification button
    createTestButton() {
        const testButton = document.querySelector('#test-notification');
        if (testButton) {
            testButton.addEventListener('click', () => {
                this.sendTestNotification();
            });
        }
    },
    
    // Update UI based on current state
    updateUI() {
        const toggle = document.querySelector('#notification-toggle');
        const status = document.querySelector('#notification-status');
        
        if (toggle) {
            toggle.checked = this.permission === 'granted' && this.subscription;
            toggle.disabled = !this.isSupported;
        }
        
        if (status) {
            let statusText = '';
            let statusClass = '';
            
            if (!this.isSupported) {
                statusText = 'Not supported in this browser';
                statusClass = 'status-error';
            } else if (this.permission === 'denied') {
                statusText = 'Notifications blocked';
                statusClass = 'status-error';
            } else if (this.permission === 'granted' && this.subscription) {
                statusText = 'Notifications enabled';
                statusClass = 'status-success';
            } else {
                statusText = 'Notifications disabled';
                statusClass = 'status-warning';
            }
            
            status.textContent = statusText;
            status.className = `notification-status ${statusClass}`;
        }
    },
    
    // Send test notification
    async sendTestNotification() {
        if (this.permission === 'granted') {
            // Show local notification first
            this.showLocalNotification(
                'Test Notification',
                'This is a test notification from Odún Calendar',
                { tag: 'test' }
            );
            
            // Send test notification via server
            try {
                await fetch('/api/test-notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } catch (error) {
                console.error('Failed to send test notification:', error);
            }
        } else {
            App.showNotification('Please enable notifications first', 'warning');
        }
    },
    
    // Show local notification
    showLocalNotification(title, body, options = {}) {
        if (this.permission === 'granted') {
            const notification = new Notification(title, {
                body: body,
                icon: '/static/images/icon-192.png',
                badge: '/static/images/badge-72.png',
                tag: options.tag || 'default',
                requireInteraction: false,
                ...options
            });
            
            // Auto-close after 5 seconds
            setTimeout(() => notification.close(), 5000);
            
            // Handle click
            notification.onclick = () => {
                window.focus();
                notification.close();
                if (options.onclick) {
                    options.onclick();
                }
            };
            
            return notification;
        }
    },
    
    // Show unsupported message
    showUnsupportedMessage() {
        const container = document.querySelector('#push-notifications-container');
        if (container) {
            container.innerHTML = `
                <div class="notification-unsupported">
                    <p>Push notifications are not supported in this browser.</p>
                    <p>Please use a modern browser like Chrome, Firefox, or Safari.</p>
                </div>
            `;
        }
    },
    
    // Show permission prompt
    showPermissionPrompt() {
        const container = document.querySelector('#push-notifications-container');
        if (container) {
            container.innerHTML = `
                <div class="notification-prompt">
                    <h3>🔔 Stay Connected</h3>
                    <p>Get notified about important spiritual dates and your ritual reminders.</p>
                    <button id="enable-notifications" class="btn-primary">
                        Enable Notifications
                    </button>
                </div>
            `;
            
            document.querySelector('#enable-notifications').addEventListener('click', () => {
                this.requestPermission();
            });
        }
    },
    
    // Show permission denied message
    showPermissionDenied() {
        const container = document.querySelector('#push-notifications-container');
        if (container) {
            container.innerHTML = `
                <div class="notification-denied">
                    <p>Notifications are currently blocked.</p>
                    <p>To enable them, click the notification icon in your browser's address bar.</p>
                </div>
            `;
        }
    },
    
    // Handle incoming push messages
    handlePushMessage(event) {
        console.log('Push message received:', event);
        
        if (event.data) {
            const data = event.data.json();
            this.showLocalNotification(data.title, data.body, {
                tag: data.tag,
                icon: data.icon,
                onclick: () => {
                    if (data.url) {
                        window.open(data.url);
                    }
                }
            });
        }
    },
    
    // Schedule local notifications
    scheduleLocalNotification(title, body, delay, options = {}) {
        setTimeout(() => {
            this.showLocalNotification(title, body, options);
        }, delay);
    },
    
    // Get subscription status
    getSubscriptionStatus() {
        return {
            isSupported: this.isSupported,
            permission: this.permission,
            isSubscribed: !!this.subscription,
            subscription: this.subscription
        };
    }
};

// Device registration manager
const DeviceManager = {
    deviceInfo: null,
    
    // Initialize device registration
    async init() {
        this.detectDevice();
        await this.registerDevice();
    },
    
    // Detect device information
    detectDevice() {
        const userAgent = navigator.userAgent;
        let platform = 'web';
        
        if (/Android/i.test(userAgent)) {
            platform = 'android';
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
            platform = 'ios';
        }
        
        this.deviceInfo = {
            platform: platform,
            userAgent: userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screen: {
                width: screen.width,
                height: screen.height
            }
        };
    },
    
    // Register device with server
    async registerDevice() {
        try {
            const response = await fetch('/api/register-device', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.deviceInfo)
            });
            
            if (response.ok) {
                console.log('Device registered successfully');
            }
        } catch (error) {
            console.error('Device registration failed:', error);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if ('serviceWorker' in navigator) {
        PushManager.init();
        DeviceManager.init();
    }
});

// Export for global access
window.PushManager = PushManager;
window.DeviceManager = DeviceManager;