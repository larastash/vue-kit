import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

/**
 * Provides access to the current authenticated user state and helper methods.
 */
export const useUser = () => {
    const page = usePage();

    /**
     * The reactive user object derived from Inertia page props.
     */
    const user = computed(() => page.props.auth?.user || page.props.user || null);

    const isAuthenticated = computed(() => !!user.value);
    const isGuest = computed(() => !user.value);
    const id = computed(() => user.value?.id || null);
    const isEmailVerified = computed(() => !!user.value?.email_verified_at);

    /**
     * Internal helper to traverse nested objects safely (e.g. 'company.address.city').
     */
    const _getNested = (obj, path) => {
        if (!obj || !path) return undefined;
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    /**
     * Retrieves a property or a nested relation using dot notation.
     *
     * @example get('company.name') // Returns "Tech Corp"
     * @example get('roles.0.name') // Returns "Admin"
     */
    const get = (path, defaultValue = null) => {
        const value = _getNested(user.value, path);
        return value !== undefined ? value : defaultValue;
    };

    /**
     * Checks if a specific key or nested relation exists and is not null.
     */
    const has = (path) => {
        const value = _getNested(user.value, path);
        return value !== undefined && value !== null;
    };

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
