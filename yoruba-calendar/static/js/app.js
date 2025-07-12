// Main Application JavaScript for Odún Calendar

// Global App Configuration
const App = {
    config: {
        apiBase: '/api',
        pushEnabled: false,
        notificationPermission: 'default'
    },
    
    // Initialize the application
    init() {
        this.setupEventListeners();
        this.checkNotificationPermission();
        this.loadUserData();
        this.setupPushNotifications();
        console.log('Odún Calendar App initialized');
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-navigate]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('data-navigate'));
            }
        });
        
        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('.ajax-form')) {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });
        
        // Notification actions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mark-notification-read')) {
                e.preventDefault();
                this.markNotificationRead(e.target.dataset.notificationId);
            }
        });
        
        // Theme toggle
        const themeToggle = document.querySelector('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme);
        }
    },
    
    // Navigation handler
    navigate(url) {
        window.location.href = url;
    },
    
    // Form submission handler
    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const url = form.action || form.dataset.action;
        const method = form.method || 'POST';
        
        try {
            this.showLoader(form);
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                this.showNotification('Success!', 'success');
                if (result.redirect) {
                    window.location.href = result.redirect;
                } else {
                    form.reset();
                    window.location.reload();
                }
            } else {
                this.showNotification(result.message || 'An error occurred', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Network error. Please try again.', 'error');
        } finally {
            this.hideLoader(form);
        }
    },
    
    // Notification management
    async markNotificationRead(notificationId) {
        try {
            const response = await fetch(`/mark_notification_read/${notificationId}`, {
                method: 'POST'
            });
            
            if (response.ok) {
                const element = document.querySelector(`[data-notification-id="${notificationId}"]`);
                if (element) {
                    element.classList.add('notification-read');
                    element.classList.remove('notification-unread');
                }
                this.updateNotificationCount();
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    },
    
    // Update notification count in UI
    updateNotificationCount() {
        const countElements = document.querySelectorAll('.notification-count');
        const unreadNotifications = document.querySelectorAll('.notification-unread').length;
        
        countElements.forEach(element => {
            element.textContent = unreadNotifications;
            element.style.display = unreadNotifications > 0 ? 'inline' : 'none';
        });
    },
    
    // Push notification setup
    async setupPushNotifications() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.register('/static/js/sw.js');
                console.log('Service Worker registered:', registration);
                
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    this.config.pushEnabled = true;
                    this.subscribeToPush(registration);
                }
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    },
    
    // Subscribe to push notifications
    async subscribeToPush(registration) {
        try {
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(window.VAPID_PUBLIC_KEY || '')
            });
            
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription)
            });
            
            console.log('Push subscription successful');
        } catch (error) {
            console.error('Push subscription failed:', error);
        }
    },
    
    // Convert VAPID key
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
    
    // Check notification permission
    checkNotificationPermission() {
        if ('Notification' in window) {
            this.config.notificationPermission = Notification.permission;
        }
    },
    
    // Show browser notification
    showBrowserNotification(title, options = {}) {
        if (this.config.notificationPermission === 'granted') {
            return new Notification(title, {
                icon: '/static/images/icon-192.png',
                badge: '/static/images/badge-72.png',
                ...options
            });
        }
    },
    
    // Load user data
    async loadUserData() {
        try {
            const response = await fetch('/api/user');
            if (response.ok) {
                const userData = await response.json();
                this.updateUserUI(userData);
            }
        } catch (error) {
            console.log('Not logged in or error loading user data');
        }
    },
    
    // Update user interface with user data
    updateUserUI(userData) {
        const userElements = document.querySelectorAll('[data-user-field]');
        userElements.forEach(element => {
            const field = element.dataset.userField;
            if (userData[field]) {
                element.textContent = userData[field];
            }
        });
    },
    
    // Theme management
    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    },
    
    // Initialize theme from storage
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    },
    
    // Show loading state
    showLoader(element) {
        const loader = element.querySelector('.loader') || this.createLoader();
        element.appendChild(loader);
        element.classList.add('loading');
    },
    
    // Hide loading state
    hideLoader(element) {
        const loader = element.querySelector('.loader');
        if (loader) {
            loader.remove();
        }
        element.classList.remove('loading');
    },
    
    // Create loader element
    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader spinner';
        return loader;
    },
    
    // Show notification toast
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fade-in`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    },
    
    // Utility functions
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },
    
    formatTime(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // API helpers
    async apiRequest(endpoint, options = {}) {
        const url = `${this.config.apiBase}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const response = await fetch(url, { ...defaultOptions, ...options });
        return response.json();
    }
};

// Calendar specific functions
const Calendar = {
    // Load calendar data
    async loadCalendarData(date = null) {
        try {
            const endpoint = date ? `/calendar/${date}` : '/calendar/today';
            const data = await App.apiRequest(endpoint);
            this.updateCalendarUI(data);
        } catch (error) {
            console.error('Error loading calendar data:', error);
        }
    },
    
    // Update calendar UI
    updateCalendarUI(calendarData) {
        const calendarContainer = document.querySelector('#calendar-container');
        if (calendarContainer && calendarData) {
            calendarContainer.innerHTML = this.renderCalendarDay(calendarData);
        }
    },
    
    // Render calendar day
    renderCalendarDay(dayData) {
        return `
            <div class="calendar-day-card glass">
                <h3>${dayData.month} - Day ${dayData.day}</h3>
                <p class="orisha">${dayData.orisha}</p>
                <p class="theme">${dayData.theme}</p>
                <div class="activities">
                    ${dayData.activities.map(activity => 
                        `<span class="activity-tag">${activity}</span>`
                    ).join('')}
                </div>
                <div class="offerings">
                    ${dayData.offerings.map(offering => 
                        `<span class="offering-tag">${offering}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }
};

// Ritual management functions
const Rituals = {
    // Add new ritual
    async addRitual(ritualData) {
        try {
            const response = await App.apiRequest('/rituals', {
                method: 'POST',
                body: JSON.stringify(ritualData)
            });
            
            if (response.status === 'success') {
                App.showNotification('Ritual added successfully!', 'success');
                this.loadUserRituals();
            }
        } catch (error) {
            console.error('Error adding ritual:', error);
            App.showNotification('Failed to add ritual', 'error');
        }
    },
    
    // Load user rituals
    async loadUserRituals() {
        try {
            const rituals = await App.apiRequest('/rituals');
            this.updateRitualsUI(rituals);
        } catch (error) {
            console.error('Error loading rituals:', error);
        }
    },
    
    // Update rituals UI
    updateRitualsUI(rituals) {
        const ritualsContainer = document.querySelector('#rituals-container');
        if (ritualsContainer) {
            ritualsContainer.innerHTML = rituals.map(ritual => 
                this.renderRitualCard(ritual)
            ).join('');
        }
    },
    
    // Render ritual card
    renderRitualCard(ritual) {
        return `
            <div class="ritual-card glass">
                <div class="ritual-header">
                    <span class="ritual-date">${ritual.date}</span>
                    <span class="ritual-status ${ritual.completed ? 'completed' : 'pending'}">
                        ${ritual.completed ? '✓' : '○'}
                    </span>
                </div>
                <div class="ritual-content">
                    <p>${ritual.notes}</p>
                </div>
                <div class="ritual-actions">
                    <button onclick="Rituals.toggleRitual(${ritual.id})" 
                            class="btn-secondary">
                        ${ritual.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                </div>
            </div>
        `;
    },
    
    // Toggle ritual completion
    async toggleRitual(ritualId) {
        try {
            const response = await App.apiRequest(`/rituals/${ritualId}/toggle`, {
                method: 'PATCH'
            });
            
            if (response.status === 'success') {
                this.loadUserRituals();
            }
        } catch (error) {
            console.error('Error toggling ritual:', error);
        }
    }
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    App.initTheme();
    App.init();
    
    // Initialize specific modules if on relevant pages
    if (document.querySelector('#calendar-container')) {
        Calendar.loadCalendarData();
    }
    
    if (document.querySelector('#rituals-container')) {
        Rituals.loadUserRituals();
    }
});

// Export for global access
window.App = App;
window.Calendar = Calendar;
window.Rituals = Rituals;