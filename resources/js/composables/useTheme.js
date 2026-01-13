import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';

/**
 * Provides access to theme state and controls.
 */
export const useTheme = () => {
    const store = useThemeStore();

    /**
     * Reactive references to store state.
     * Use these in templates or watchers.
     */
    const { currentTheme, isDark } = storeToRefs(store);

    /**
     * Cycles through available themes: Light -> Dark -> System -> Light.
     * Useful for a single button click handler.
     */
    const toggleTheme = () => {
        const themes = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(store.currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        store.setTheme(nextTheme);
    };

    /** Explicitly sets the theme to 'light'. */
    const setLightTheme = () => store.setTheme('light');

    /** Explicitly sets the theme to 'dark'. */
    const setDarkTheme = () => store.setTheme('dark');

    /**
     * Sets the theme to follow the operating system preference.
     * Requires the store to handle `window.matchMedia` listeners.
     */
    const setSystemTheme = () => store.setTheme('system');

    return {
        /**
         * The currently active theme mode string ('light' | 'dark' | 'system').
         */
        currentTheme,

        /**
         * Boolean indicating if the effective visual style is currently dark.
         * (True if theme is 'dark' OR theme is 'system' and OS is dark).
         */
        isDark,

        /** Cycles through themes. */
        toggleTheme,

        setLightTheme,
        setDarkTheme,
        setSystemTheme,

        /**
         * Initializes the theme system: validates storage, applies styles,
         * and starts listening for OS preference changes (if in 'system' mode).
         */
        initTheme: store.initTheme,

        /**
         * Direct access to the underlying Pinia store instance if needed.
         */
        store,
    };
};
