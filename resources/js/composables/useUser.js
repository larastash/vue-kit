import { usePage } from '@inertiajs/vue3';
import { computed, toValue } from 'vue';

export const useUser = () => {
    const page = usePage();
    const user = computed(() => page.props.auth?.user || page.props.user || null);

    const isAuthenticated = computed(() => !!user.value);
    const isGuest = computed(() => !user.value);
    const id = computed(() => user.value?.id || null);

    const has = (key) => computed(() => {
        const userData = toValue(user);
        if (!userData) return false;
        return key in userData && userData[key] !== null && userData[key] !== undefined;
    });

    const get = (field, defaultValue = null) => computed(() => {
        const userData = toValue(user);
        return userData?.[field] ?? defaultValue;
    });

    const all = computed(() => toValue(user));

    const isEmailVerified = computed(() => !!user.value?.email_verified_at);

    return {
        isAuthenticated,
        isGuest,
        id,
        get,
        has,
        all,
        isEmailVerified,
    };
};
