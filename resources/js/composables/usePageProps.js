import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

/**
 * Типизированный доступ к Inertia page props.
 *
 * @example
 * const { prop, props } = usePageProps();
 *
 * const appName = prop('appName', 'Laravel');
 * const ziggy = prop('ziggy');
 */
export const usePageProps = () => {
    const page = usePage();

    const props = computed(() => page.props ?? {});

    const prop = (key, defaultValue = null) => computed(() => page.props?.[key] ?? defaultValue);

    return {
        props,
        prop,
    };
};
