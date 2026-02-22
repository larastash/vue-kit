import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { dataGet } from '@/utils/helpers';

export const useUser = () => {
    const page = usePage();

    const user = computed(() => page.props?.auth?.user ?? page.props?.user ?? null);

    const id = computed(() => user.value?.id ?? null);
    const isEmailVerified = computed(() => Boolean(user.value?.email_verified_at));
    const isAuthenticated = computed(() => Boolean(user.value));
    const isGuest = computed(() => !user.value);

    const initials = (length = 2) => {
        return fullName.value
            ?.split(' ')
            .map(w => w[0])
            .join('')
            .toUpperCase()
            .slice(0, length) ?? null;
    };

    const get = (path, defaultValue = null) => dataGet(user.value, path, defaultValue);
    const has = (path) => dataGet(user.value, path) != null;

    const roles = computed(() => user.value?.roles ?? []);
    const permissions = computed(() => user.value?.permissions ?? []);

    const hasRole = (...args) => args.flat().some(r => roles.value.includes(r));
    const hasAnyRole = (...args) => args.flat().some(r => roles.value.includes(r));
    const hasAllRoles = (...args) => args.flat().every(r => roles.value.includes(r));
    const can = (permission) => permissions.value.includes(permission);
    const cannot = (permission) => !can(permission);

    const is = (otherUser) => id.value != null && id.value === otherUser?.id;
    const isNot = (otherUser) => !is(otherUser);

    return {
        id,

        user,

        initials,

        isEmailVerified,
        isAuthenticated,
        isGuest,

        get,
        has,

        roles,
        permissions,
        hasRole,
        hasAnyRole,
        hasAllRoles,
        can,
        cannot,

        is,
        isNot,
    };
};
