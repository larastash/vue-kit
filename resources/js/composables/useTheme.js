import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';

export const useTheme = () => {
    const store = useThemeStore();

    const { currentTheme, isDark } = storeToRefs(store);

    const toggleTheme = () => {
        const themes = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(store.currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        store.setTheme(nextTheme);
    };

    const setLightTheme = () => store.setTheme('light');
    const setDarkTheme = () => store.setTheme('dark');
    const setSystemTheme = () => store.setTheme('system');

    return {
        currentTheme,
        isDark,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
        setSystemTheme,
        initTheme: store.initTheme,
        store,
    };
};
