import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

/**
 * Provides access to Inertia flash messages.
 */
export const useFlash = () => {
    const page = usePage();

    /**
     * The reactive flash object containing all messages from the backend.
     * Guaranteed to be an object (empty if null).
     */
    const flash = computed(() => page.props.flash || {});

    /**
     * Checks if a specific flash message key exists.
     */
    const has = (key) => {
        const messages = flash.value;
        return messages
            ? (messages[key] !== undefined && messages[key] !== null)
            : false;
    };

    /**
     * Retrieves a specific flash message.
     */
    const get = (key, defaultValue = null) => {
        return flash.value?.[key] ?? defaultValue;
    };

    /**
     * Returns all flash messages as a raw object.
     * Useful for debugging or iterating over all notifications.
     */
    const all = () => flash.value;

    /**
     * Checks if there are absolutely no flash messages.
     * Useful for conditionally rendering a notification container.
     */
    const isEmpty = computed(() => {
        return Object.keys(flash.value).length === 0;
    });

    return {
        flash,

        has,
        get,
        all,
        isEmpty,
    };
};
