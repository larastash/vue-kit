import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/themeStore';

export const useTheme = () => {
    const store = useThemeStore();
    const { currentTheme, isDark, effectiveTheme } = storeToRefs(store);

    const cycleOrder = ['light', 'dark', 'system'];

    const toggleTheme = () => {
        const idx = cycleOrder.indexOf(store.currentTheme);
        store.setTheme(cycleOrder[(idx + 1) % cycleOrder.length]);
    };

    return {
        currentTheme,
        effectiveTheme,
        isDark,
        toggleTheme,
        setTheme: store.setTheme,
    };
};
