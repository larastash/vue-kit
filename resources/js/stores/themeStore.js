import { defineStore } from 'pinia';

export const validThemes = ['light', 'dark', 'system'];
export const defaultTheme = 'system';

let initialized = false;
let removeSystemListener = null;

const getMediaQuery = () =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

export const useThemeStore = defineStore('themeStore', {
    state: () => ({
        currentTheme: defaultTheme,
    }),

    getters: {
        effectiveTheme(state) {
            if (state.currentTheme === 'system') {
                const mq = getMediaQuery();
                return mq?.matches ? 'dark' : 'light';
            }
            return state.currentTheme;
        },

        isDark() {
            return this.effectiveTheme === 'dark';
        },
    },

    actions: {
        setTheme(theme) {
            this.currentTheme = validThemes.includes(theme) ? theme : defaultTheme;
            this.applyTheme();
        },

        applyTheme() {
            if (typeof document === 'undefined') return;
            document.documentElement.classList.toggle('dark', this.isDark);
            document.documentElement.dataset.theme = this.currentTheme;
        },

        initTheme() {
            if (initialized) return;
            initialized = true;

            if (!validThemes.includes(this.currentTheme)) {
                this.currentTheme = defaultTheme;
            }

            this.applyTheme();
            this._bindSystemListener();
        },

        _bindSystemListener() {
            removeSystemListener?.();

            const mq = getMediaQuery();
            if (!mq) return;

            const handler = () => {
                if (this.currentTheme === 'system') this.applyTheme();
            };

            mq.addEventListener('change', handler);
            removeSystemListener = () => mq.removeEventListener('change', handler);
        },
    },

    persist: {
        key: 'theme',
        pick: ['currentTheme'],
        afterHydrate(ctx) {
            ctx.store.applyTheme();
        },
    },
});
