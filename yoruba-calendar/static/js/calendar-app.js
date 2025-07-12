/**
 * Yoruba Calendar Interactive Application
 * Handles frontend interactions and API communication
 */

class YorubaCalendarApp {
    constructor() {
        this.moonPhases = new YorubaMoonPhases();
        this.currentDate = new Date();
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTodayData();
        this.initializeDatePicker();
    }

    setupEventListeners() {
        // Date picker
        const datePicker = document.getElementById('date-picker');
        if (datePicker) {
            datePicker.addEventListener('change', (e) => {
                this.currentDate = new Date(e.target.value);
                this.loadDateData(this.currentDate);
            });
        }

        // Navigation buttons
        const prevBtn = document.getElementById('prev-day');
        const nextBtn = document.getElementById('next-day');
        const todayBtn = document.getElementById('today-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateDay(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateDay(1));
        }
        if (todayBtn) {
            todayBtn.addEventListener('click', () => {
                this.currentDate = new Date();
                this.loadTodayData();
            });
        }

        // Ritual form
        const ritualForm = document.getElementById('ritual-form');
        if (ritualForm) {
            ritualForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveRitual();
            });
        }
    }

    initializeDatePicker() {
        const datePicker = document.getElementById('date-picker');
        if (datePicker) {
            datePicker.value = this.formatDateForInput(this.currentDate);
        }
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    async loadTodayData() {
        await this.loadDateData(new Date());
    }

    async loadDateData(date) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();

        try {
            const dateStr = this.formatDateForInput(date);
            
            // Load Yoruba calendar data
            const response = await fetch(`/api/convert/${dateStr}`);
            const data = await response.json();
            
            // Calculate moon phase
            const moonPhase = this.moonPhases.calculateMoonPhase(date);
            const spiritualGuidance = this.moonPhases.getSpiritualGuidance(date);
            
            // Update UI
            this.updateCalendarDisplay(date, data, moonPhase, spiritualGuidance);
            
            // Load user rituals for this date
            await this.loadUserRituals(dateStr);
            
        } catch (error) {
            console.error('Error loading calendar data:', error);
            this.showError('Failed to load calendar data');
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }

    updateCalendarDisplay(date, yorubaData, moonPhase, guidance) {
        // Update date display
        this.updateElement('current-date', date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));

        // Update Yoruba date
        this.updateElement('yoruba-date', `${yorubaData.yoruba_day} ${yorubaData.yoruba_month} ${yorubaData.yoruba_year}`);

        // Update Orisha
        this.updateElement('current-orisha', yorubaData.orisha);
        this.updateElement('orisha-badge', yorubaData.orisha, 'orisha-badge');

        // Update moon phase
        this.updateElement('moon-phase', moonPhase.name);
        this.updateElement('moon-phase-yoruba', moonPhase.yoruba);
        this.updateElement('moon-spiritual', moonPhase.spiritual);

        // Update activities and offerings
        this.updateList('daily-activities', [yorubaData.activity]);
        this.updateList('daily-offerings', yorubaData.offerings);

        // Update spiritual guidance
        this.updateList('spiritual-practices', guidance.practices);
        this.updateList('spiritual-taboos', guidance.taboos);
        this.updateElement('spiritual-energy', guidance.energy);

        // Update prayer
        this.updateElement('daily-prayer', yorubaData.prayer);

        // Update date picker
        const datePicker = document.getElementById('date-picker');
        if (datePicker) {
            datePicker.value = this.formatDateForInput(date);
        }
    }

    updateElement(id, content, className = '') {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
            if (className) {
                element.className = className;
            }
        }
    }

    updateList(id, items) {
        const container = document.getElementById(id);
        if (container && Array.isArray(items)) {
            container.innerHTML = '';
            items.forEach(item => {
                const element = document.createElement('span');
                element.textContent = item;
                element.className = id.includes('offering') ? 'offering-tag' : 
                                   id.includes('taboo') ? 'taboo-tag' : 'practice-tag';
                container.appendChild(element);
            });
        }
    }

    navigateDay(direction) {
        const newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() + direction);
        this.currentDate = newDate;
        this.loadDateData(this.currentDate);
    }

    async loadUserRituals(dateStr) {
        try {
            const response = await fetch(`/api/rituals?date=${dateStr}`);
            const rituals = await response.json();
            this.displayUserRituals(rituals);
        } catch (error) {
            console.error('Error loading user rituals:', error);
        }
    }

    displayUserRituals(rituals) {
        const container = document.getElementById('user-rituals');
        if (!container) return;

        container.innerHTML = '';
        
        if (rituals.length === 0) {
            container.innerHTML = '<p>No rituals recorded for this date.</p>';
            return;
        }

        rituals.forEach(ritual => {
            const ritualElement = this.createRitualElement(ritual);
            container.appendChild(ritualElement);
        });
    }

    createRitualElement(ritual) {
        const div = document.createElement('div');
        div.className = 'sacred-card ritual-entry';
        
        div.innerHTML = `
            <div class="ritual-header">
                <h4>${ritual.ritual_type}</h4>
                <span class="orisha-badge">${ritual.orisha}</span>
            </div>
            <p class="ritual-notes">${ritual.ritual_notes}</p>
            <div class="ritual-details">
                <span class="moon-phase">${ritual.moon_phase}</span>
                <span class="ritual-duration">${ritual.duration_minutes || 'N/A'} min</span>
            </div>
            <div class="offerings-list">
                ${ritual.offerings.map(offering => `<span class="offering-tag">${offering}</span>`).join('')}
            </div>
            ${ritual.spiritual_outcome ? `<p class="spiritual-outcome"><em>${ritual.spiritual_outcome}</em></p>` : ''}
        `;

        return div;
    }

    async saveRitual() {
        const form = document.getElementById('ritual-form');
        if (!form) return;

        const formData = new FormData(form);
        const ritualData = {
            ritual_notes: formData.get('ritual_notes'),
            ritual_type: formData.get('ritual_type'),
            orisha: formData.get('orisha'),
            moon_phase: document.getElementById('moon-phase')?.textContent || '',
            offerings: formData.get('offerings')?.split(',').map(s => s.trim()) || [],
            spiritual_outcome: formData.get('spiritual_outcome'),
            duration_minutes: parseInt(formData.get('duration_minutes')) || null,
            location: formData.get('location'),
            privacy_level: formData.get('privacy_level') || 'private'
        };

        try {
            const response = await fetch('/api/rituals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ritualData)
            });

            if (response.ok) {
                this.showSuccess('Ritual saved successfully!');
                form.reset();
                await this.loadUserRituals(this.formatDateForInput(this.currentDate));
            } else {
                throw new Error('Failed to save ritual');
            }
        } catch (error) {
            console.error('Error saving ritual:', error);
            this.showError('Failed to save ritual');
        }
    }

    showLoading() {
        const loader = document.getElementById('loading-indicator');
        if (loader) {
            loader.style.display = 'block';
        }
    }

    hideLoading() {
        const loader = document.getElementById('loading-indicator');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transition: all 0.3s ease;
            ${type === 'success' ? 'background: #27AE60;' : 
              type === 'error' ? 'background: #CC2936;' : 
              'background: #D4AF37;'}
        `;

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.yorubaApp = new YorubaCalendarApp();
});