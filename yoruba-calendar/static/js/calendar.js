// Calendar-specific JavaScript for Odún Calendar

// Calendar module
const YorubaCalendar = {
    currentDate: new Date(),
    selectedDate: null,
    calendarData: null,
    
    // Initialize calendar
    init() {
        this.bindEvents();
        this.loadCurrentDate();
        this.setupDateNavigation();
        console.log('Yoruba Calendar module initialized');
    },
    
    // Bind calendar events
    bindEvents() {
        // Date navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.calendar-nav-prev')) {
                this.navigateDate(-1);
            }
            if (e.target.matches('.calendar-nav-next')) {
                this.navigateDate(1);
            }
            if (e.target.matches('.calendar-today')) {
                this.goToToday();
            }
        });
        
        // Calendar grid interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.calendar-day')) {
                this.selectDate(e.target.dataset.date);
            }
        });
        
        // Month/Year selectors
        const monthSelect = document.querySelector('#month-select');
        const yearSelect = document.querySelector('#year-select');
        
        if (monthSelect) {
            monthSelect.addEventListener('change', () => this.updateCalendarView());
        }
        if (yearSelect) {
            yearSelect.addEventListener('change', () => this.updateCalendarView());
        }
    },
    
    // Load current date and calendar data
    async loadCurrentDate() {
        try {
            const response = await fetch('/api/today');
            const data = await response.json();
            this.calendarData = data;
            this.updateCalendarDisplay(data);
        } catch (error) {
            console.error('Error loading current date:', error);
        }
    },
    
    // Navigate to different date
    navigateDate(days) {
        this.currentDate.setDate(this.currentDate.getDate() + days);
        this.loadDateData(this.currentDate);
    },
    
    // Go to today
    goToToday() {
        this.currentDate = new Date();
        this.loadCurrentDate();
    },
    
    // Load data for specific date
    async loadDateData(date) {
        try {
            const dateString = date.toISOString().split('T')[0];
            const response = await fetch(`/api/calendar/${dateString}`);
            const data = await response.json();
            this.calendarData = data;
            this.updateCalendarDisplay(data);
        } catch (error) {
            console.error('Error loading date data:', error);
        }
    },
    
    // Update calendar display
    updateCalendarDisplay(data) {
        this.updateDateHeader(data);
        this.updateOrishaInfo(data);
        this.updateActivities(data);
        this.updateOfferings(data);
        this.updateMoonPhase(data);
        this.highlightCurrentDate();
    },
    
    // Update date header
    updateDateHeader(data) {
        const elements = {
            month: document.querySelector('.yoruba-month'),
            day: document.querySelector('.yoruba-day'),
            gregorianDate: document.querySelector('.gregorian-date')
        };
        
        if (elements.month) elements.month.textContent = data.month;
        if (elements.day) elements.day.textContent = `Day ${data.day}`;
        if (elements.gregorianDate) {
            elements.gregorianDate.textContent = this.formatGregorianDate(this.currentDate);
        }
    },
    
    // Update Orisha information
    updateOrishaInfo(data) {
        const orishaName = document.querySelector('.orisha-name');
        const orishaTheme = document.querySelector('.orisha-theme');
        const orishaDescription = document.querySelector('.orisha-description');
        
        if (orishaName) orishaName.textContent = data.orisha;
        if (orishaTheme) orishaTheme.textContent = data.theme;
        if (orishaDescription && data.description) {
            orishaDescription.textContent = data.description;
        }
        
        // Update Orisha colors/styling
        this.updateOrishaTheme(data.orisha);
    },
    
    // Update activities list
    updateActivities(data) {
        const activitiesContainer = document.querySelector('.activities-list');
        if (activitiesContainer && data.activities) {
            activitiesContainer.innerHTML = data.activities.map(activity => 
                `<span class="activity-tag">${activity}</span>`
            ).join('');
        }
    },
    
    // Update offerings list
    updateOfferings(data) {
        const offeringsContainer = document.querySelector('.offerings-list');
        if (offeringsContainer && data.offerings) {
            offeringsContainer.innerHTML = data.offerings.map(offering => 
                `<span class="offering-tag">${offering}</span>`
            ).join('');
        }
    },
    
    // Update moon phase
    updateMoonPhase(data) {
        const moonPhase = document.querySelector('.moon-phase');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (data.moonPhase) {
            if (moonPhase) moonPhase.textContent = data.moonPhase;
            if (moonIcon) moonIcon.textContent = this.getMoonIcon(data.moonPhase);
        }
    },
    
    // Get moon phase icon
    getMoonIcon(phase) {
        const moonIcons = {
            'New Moon': '🌑',
            'Waxing Crescent': '🌒',
            'First Quarter': '🌓',
            'Waxing Gibbous': '🌔',
            'Full Moon': '🌕',
            'Waning Gibbous': '🌖',
            'Last Quarter': '🌗',
            'Waning Crescent': '🌘'
        };
        return moonIcons[phase] || '🌙';
    },
    
    // Update Orisha theme colors
    updateOrishaTheme(orisha) {
        const themeElement = document.querySelector('.calendar-container');
        if (themeElement) {
            // Remove existing theme classes
            themeElement.classList.remove(...this.getOrishaThemeClasses());
            
            // Add new theme class
            const themeClass = this.getOrishaThemeClass(orisha);
            if (themeClass) {
                themeElement.classList.add(themeClass);
            }
        }
    },
    
    // Get Orisha theme class
    getOrishaThemeClass(orisha) {
        const themes = {
            'Ọbàtálá': 'theme-obatala',
            'Ògún': 'theme-ogun',
            'Ṣàngó': 'theme-shango',
            'Ọya': 'theme-oya',
            'Yemọja': 'theme-yemoja',
            'Ọ̀ṣun': 'theme-oshun',
            'Ọ̀rúnmìlà': 'theme-orunmila',
            'Èṣù': 'theme-eshu'
        };
        return themes[orisha];
    },
    
    // Get all Orisha theme classes
    getOrishaThemeClasses() {
        return [
            'theme-obatala', 'theme-ogun', 'theme-shango', 'theme-oya',
            'theme-yemoja', 'theme-oshun', 'theme-orunmila', 'theme-eshu'
        ];
    },
    
    // Highlight current date in calendar grid
    highlightCurrentDate() {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        
        // Remove previous highlights
        document.querySelectorAll('.calendar-day.today').forEach(day => {
            day.classList.remove('today');
        });
        
        // Add highlight to current date
        const todayElement = document.querySelector(`[data-date="${todayString}"]`);
        if (todayElement) {
            todayElement.classList.add('today');
        }
    },
    
    // Select specific date
    selectDate(dateString) {
        const date = new Date(dateString);
        this.currentDate = date;
        this.selectedDate = dateString;
        this.loadDateData(date);
        
        // Update selected state in UI
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        
        const selectedElement = document.querySelector(`[data-date="${dateString}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
    },
    
    // Setup date navigation
    setupDateNavigation() {
        const dateInput = document.querySelector('#date-picker');
        if (dateInput) {
            dateInput.addEventListener('change', (e) => {
                this.selectDate(e.target.value);
            });
        }
    },
    
    // Format Gregorian date
    formatGregorianDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Generate calendar grid for month view
    generateCalendarGrid(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        let html = '<div class="calendar-grid">';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            html += `<div class="calendar-header">${day}</div>`;
        });
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="calendar-day empty"></div>';
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = date.toISOString().split('T')[0];
            const isToday = this.isToday(date);
            const isSelected = dateString === this.selectedDate;
            
            html += `
                <div class="calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" 
                     data-date="${dateString}">
                    <span class="day-number">${day}</span>
                    <div class="day-indicators">
                        ${this.getDayIndicators(date)}
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    },
    
    // Check if date is today
    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    },
    
    // Get day indicators (events, rituals, etc.)
    getDayIndicators(date) {
        // This would be enhanced to show actual events/rituals
        return '<div class="indicator ritual"></div>';
    },
    
    // Update calendar view
    updateCalendarView() {
        const monthSelect = document.querySelector('#month-select');
        const yearSelect = document.querySelector('#year-select');
        const calendarGrid = document.querySelector('#calendar-grid');
        
        if (monthSelect && yearSelect && calendarGrid) {
            const month = parseInt(monthSelect.value);
            const year = parseInt(yearSelect.value);
            calendarGrid.innerHTML = this.generateCalendarGrid(year, month);
        }
    },
    
    // Export calendar data
    exportCalendar(format = 'json') {
        const data = {
            currentDate: this.currentDate,
            selectedDate: this.selectedDate,
            calendarData: this.calendarData
        };
        
        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        }
        
        // Could add other formats like CSV, iCal, etc.
        return data;
    },
    
    // Share calendar
    shareCalendar() {
        if (navigator.share && this.calendarData) {
            navigator.share({
                title: `Yoruba Calendar - ${this.calendarData.month} Day ${this.calendarData.day}`,
                text: `Today's Orisha: ${this.calendarData.orisha} - ${this.calendarData.theme}`,
                url: window.location.href
            });
        } else {
            // Fallback to copying to clipboard
            const shareText = `Yoruba Calendar - ${this.calendarData.month} Day ${this.calendarData.day}\nOrisha: ${this.calendarData.orisha}\nTheme: ${this.calendarData.theme}`;
            navigator.clipboard.writeText(shareText).then(() => {
                App.showNotification('Calendar info copied to clipboard!', 'success');
            });
        }
    }
};

// Calendar utilities
const CalendarUtils = {
    // Convert Gregorian to Yoruba date
    gregorianToYoruba(gregorianDate) {
        // Simplified conversion - would use actual astronomical calculations
        const dayOfYear = this.getDayOfYear(gregorianDate);
        const yorubaMonth = Math.floor((dayOfYear - 1) / 28) + 1;
        const yorubaDay = ((dayOfYear - 1) % 28) + 1;
        
        return {
            month: yorubaMonth,
            day: yorubaDay,
            monthName: this.getYorubaMonthName(yorubaMonth)
        };
    },
    
    // Get day of year
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },
    
    // Get Yoruba month name
    getYorubaMonthName(monthNumber) {
        const months = [
            'Ṣẹ̀rẹ̀', 'Èrèlé', 'Ẹrẹ̀nà', 'Ìgbè', 'Ebi', 'Òkúdu',
            'Agẹmọ', 'Ògún', 'Owèwè', 'Ọ̀wàrà', 'Bélú', 'Ọ̀pẹ̀', 'Ọ̀pẹ̀lú'
        ];
        return months[monthNumber - 1] || 'Unknown';
    },
    
    // Calculate moon phase
    calculateMoonPhase(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // Simplified moon phase calculation
        const totalDays = year * 365 + month * 30 + day;
        const phase = (totalDays % 29.53) / 29.53;
        
        if (phase < 0.125) return 'New Moon';
        if (phase < 0.25) return 'Waxing Crescent';
        if (phase < 0.375) return 'First Quarter';
        if (phase < 0.5) return 'Waxing Gibbous';
        if (phase < 0.625) return 'Full Moon';
        if (phase < 0.75) return 'Waning Gibbous';
        if (phase < 0.875) return 'Last Quarter';
        return 'Waning Crescent';
    }
};

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.calendar-container')) {
        YorubaCalendar.init();
    }
});

// Export for global access
window.YorubaCalendar = YorubaCalendar;
window.CalendarUtils = CalendarUtils;