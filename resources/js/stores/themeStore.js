import { defineStore } from 'pinia';

const validThemes = ['light', 'dark', 'system'];
const defaultTheme = 'system';

export { validThemes, defaultTheme };

export const useThemeStore = defineStore('themeStore', {
    state: () => ({
        currentTheme: 'system', // 'light', 'dark', 'system'
    }),
    actions: {
        setTheme(theme) {
            this.currentTheme = validThemes.includes(theme) ? theme : defaultTheme;
            this.applyTheme();
        },

        applyTheme() {
            const root = document.documentElement;

            if (this.currentTheme === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.toggle('dark', prefersDark);
            } else {
                root.classList.toggle('dark', this.currentTheme === 'dark');
            }
        },

        initTheme() {
            if (!validThemes.includes(this.currentTheme)) {
                this.currentTheme = defaultTheme;
            }

            this.applyTheme();

            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', () => {
                    if (this.currentTheme === 'system') {
                        this.applyTheme();
                    }
                });
        }
    },
    getters: {
        isDark: (state) => {
            if (state.currentTheme === 'system') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            return state.currentTheme === 'dark';
        }
    },
    persist: {
        key: 'theme',
    },
});
