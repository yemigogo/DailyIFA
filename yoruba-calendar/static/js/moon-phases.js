/**
 * Yoruba Calendar Moon Phase Calculator
 * Astronomical calculations for traditional Yoruba spiritual practices
 */

class YorubaMoonPhases {
    constructor() {
        this.synodic_month = 29.53058868; // Precise synodic month in days
        this.new_moon_reference = new Date('2000-01-06'); // Known new moon reference
    }

    /**
     * Calculate precise moon phase for a given date
     * @param {Date} date - Date to calculate moon phase for
     * @returns {Object} Moon phase information
     */
    calculateMoonPhase(date) {
        const daysSinceReference = (date - this.new_moon_reference) / (1000 * 60 * 60 * 24);
        const moonCycle = daysSinceReference % this.synodic_month;
        const phasePercentage = moonCycle / this.synodic_month;
        
        const phases = [
            { name: "🌑 New Moon", yoruba: "Òṣùpá Tuntun", phase: 0, spiritual: "New beginnings, purification" },
            { name: "🌒 Waxing Crescent", yoruba: "Òṣùpá Gbígbé", phase: 1, spiritual: "Growth, intention setting" },
            { name: "🌓 First Quarter", yoruba: "Òṣùpá Àgbedè", phase: 2, spiritual: "Action, determination" },
            { name: "🌔 Waxing Gibbous", yoruba: "Òṣùpá Ńgbọ́n", phase: 3, spiritual: "Patience, refinement" },
            { name: "🌕 Full Moon", yoruba: "Òṣùpá Kìkùn", phase: 4, spiritual: "Manifestation, power" },
            { name: "🌖 Waning Gibbous", yoruba: "Òṣùpá Ńdín", phase: 5, spiritual: "Gratitude, sharing wisdom" },
            { name: "🌗 Last Quarter", yoruba: "Òṣùpá Ìdajì", phase: 6, spiritual: "Release, forgiveness" },
            { name: "🌘 Waning Crescent", yoruba: "Òṣùpá Ńkú", phase: 7, spiritual: "Rest, reflection" }
        ];

        const phaseIndex = Math.floor(phasePercentage * 8) % 8;
        const currentPhase = phases[phaseIndex];
        
        return {
            ...currentPhase,
            illumination: this.calculateIllumination(phasePercentage),
            nextNewMoon: this.getNextNewMoon(date),
            nextFullMoon: this.getNextFullMoon(date),
            dayInCycle: Math.floor(moonCycle),
            phasePercentage: phasePercentage
        };
    }

    /**
     * Calculate moon illumination percentage
     * @param {number} phasePercentage - Phase as percentage of cycle
     * @returns {number} Illumination percentage
     */
    calculateIllumination(phasePercentage) {
        if (phasePercentage <= 0.5) {
            return phasePercentage * 2; // Waxing
        } else {
            return 2 - (phasePercentage * 2); // Waning
        }
    }

    /**
     * Get next new moon date
     * @param {Date} date - Reference date
     * @returns {Date} Next new moon date
     */
    getNextNewMoon(date) {
        const daysSinceReference = (date - this.new_moon_reference) / (1000 * 60 * 60 * 24);
        const cyclesSinceReference = Math.floor(daysSinceReference / this.synodic_month);
        const nextNewMoonDays = (cyclesSinceReference + 1) * this.synodic_month;
        
        return new Date(this.new_moon_reference.getTime() + (nextNewMoonDays * 24 * 60 * 60 * 1000));
    }

    /**
     * Get next full moon date
     * @param {Date} date - Reference date
     * @returns {Date} Next full moon date
     */
    getNextFullMoon(date) {
        const nextNewMoon = this.getNextNewMoon(date);
        return new Date(nextNewMoon.getTime() + (this.synodic_month / 2 * 24 * 60 * 60 * 1000));
    }

    /**
     * Get spiritual guidance for current moon phase
     * @param {Date} date - Date to get guidance for
     * @returns {Object} Spiritual guidance and practices
     */
    getSpiritualGuidance(date) {
        const moonPhase = this.calculateMoonPhase(date);
        
        const guidance = {
            "🌑 New Moon": {
                practices: ["Meditation", "Setting intentions", "Purification rituals"],
                offerings: ["White candles", "Clear water", "White flowers"],
                taboos: ["Making major decisions", "Starting conflicts"],
                energy: "Receptive, introspective, cleansing"
            },
            "🌕 Full Moon": {
                practices: ["Manifestation rituals", "Divination", "Healing ceremonies"],
                offerings: ["Fruits", "Palm wine", "Cooked foods"],
                taboos: ["Sleeping outdoors", "Cutting hair"],
                energy: "Active, powerful, transformative"
            },
            "🌓 First Quarter": {
                practices: ["Action taking", "Commitment ceremonies", "Strength rituals"],
                offerings: ["Red palm oil", "Kola nuts", "Iron objects"],
                taboos: ["Hesitation", "Backing down from challenges"],
                energy: "Decisive, courageous, forward-moving"
            },
            "🌗 Last Quarter": {
                practices: ["Release rituals", "Forgiveness ceremonies", "Ancestral communication"],
                offerings: ["Black beans", "Dark cloth", "Libations"],
                taboos: ["Starting new projects", "Making promises"],
                energy: "Releasing, transformative, ancestral"
            }
        };

        return guidance[moonPhase.name] || guidance["🌑 New Moon"];
    }
}

// Export for use in both browser and Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YorubaMoonPhases;
} else if (typeof window !== 'undefined') {
    window.YorubaMoonPhases = YorubaMoonPhases;
}