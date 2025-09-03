import { usePage } from '@inertiajs/vue3';
import { computed, toValue } from 'vue';

export const useFlash = () => {
    const page = usePage();
    const flash = computed(() => page.props.flash || {});

    const has = (key) => computed(() => {
        const flashData = toValue(flash);
        return key in flashData && flashData[key] !== null && flashData[key] !== undefined;
    });

    const get = (key, defaultValue = null) => computed(() => {
        const flashData = toValue(flash);
        return flashData[key] ?? defaultValue;
    });

    const all = computed(() => toValue(flash));

    const isEmpty = computed(() => {
        const flashData = toValue(flash);
        return !flashData || Object.keys(flashData).length === 0;
    });

    return {
        flash,
        has,
        get,
        all,
        isEmpty,
    };
};
