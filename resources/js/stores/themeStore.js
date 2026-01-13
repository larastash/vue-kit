import { defineStore } from 'pinia';

/**
 * Allowed theme values.
 */
const validThemes = ['light', 'dark', 'system'];

/**
 * Fallback theme if an invalid value is found in storage.
 */
const defaultTheme = 'system';

// Export constants for use in components/composables
export { validThemes, defaultTheme };

export const useThemeStore = defineStore('themeStore', {
    state: () => ({
        /**
         * The active theme preference.
         */
        currentTheme: 'system',
    }),

    actions: {
        /**
         * Updates the theme state and applies the visual changes.
         */
        setTheme(theme) {
            this.currentTheme = validThemes.includes(theme) ? theme : defaultTheme;
            this.applyTheme();
        },

        /**
         * Applies the 'dark' class to the document root (<html> tag) based on the current configuration.
         * - If 'system': Checks user's OS preference via matchMedia.
         * - If 'light'/'dark': Forces the respective mode.
         */
        applyTheme() {
            const root = document.documentElement;

            if (this.currentTheme === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.toggle('dark', prefersDark);
            } else {
                root.classList.toggle('dark', this.currentTheme === 'dark');
            }
        },

        /**
         * Initializes the theme system.
         * Should be called once at application startup (e.g., in App.vue or main.js).
         *
         * 1. Validates the stored theme.
         * 2. Applies the initial visual state.
         * 3. Sets up a listener for OS theme changes (dynamic switching when in 'system' mode).
         */
        initTheme() {
            // Validate stored value (in case local storage was tampered with)
            if (!validThemes.includes(this.currentTheme)) {
                this.currentTheme = defaultTheme;
            }

            this.applyTheme();

            // Listen for OS level changes (e.g., user toggles Dark Mode in Windows/macOS settings)
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (e) => {
                    if (this.currentTheme === 'system') {
                        // Re-apply specifically for system mode
                        const root = document.documentElement;
                        root.classList.toggle('dark', e.matches);
                    }
                });
        }
    },

    getters: {
        /**
         * Computes whether the interface should currently look dark.
         * Useful for conditional logic in JS (e.g. charts colors).
         *
         * @returns {boolean} True if visually dark.
         */
        isDark: (state) => {
            if (state.currentTheme === 'system') {
                // Note: reactive updates depend on window resize/events or state changes
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            return state.currentTheme === 'dark';
        }
    },

    /**
     * Configuration for pinia-plugin-persistedstate.
     * Saves 'currentTheme' to localStorage automatically.
     */
    persist: {
        key: 'theme_preference', // Explicit key name is safer than auto-generated ones
        paths: ['currentTheme'], // Only persist the preference, not derived state
    },
});
