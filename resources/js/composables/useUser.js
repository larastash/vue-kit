import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { dataGet } from '@/utils/helpers';

export const useUser = () => {
    const page = usePage();

    const user = computed(() => page.props?.auth?.user ?? page.props?.user ?? null);

    const isAuthenticated = computed(() => Boolean(user.value));
    const isGuest = computed(() => !user.value);
    const id = computed(() => user.value?.id ?? null);
    const isEmailVerified = computed(() => Boolean(user.value?.email_verified_at));

    const get = (path, defaultValue = null) => dataGet(user.value, path, defaultValue);
    const has = (path) => dataGet(user.value, path) != null;

    return {
        user,
        isAuthenticated,
        isGuest,
        id,
        isEmailVerified,
        get,
        has,
    };
};
