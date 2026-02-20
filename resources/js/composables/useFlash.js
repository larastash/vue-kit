import { computed, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

export const useFlash = () => {
    const page = usePage();

    const flash = computed(() => page.props?.flash ?? {});

    const has = (key) => {
        const value = flash.value?.[key];
        return value !== undefined && value !== null && value !== '';
    };

    const get = (key, defaultValue = null) => flash.value?.[key] ?? defaultValue;
    const all = () => flash.value;
    const isEmpty = computed(() => Object.keys(flash.value).length === 0);

    return {
        flash,
        has,
        get,
        all,
        isEmpty,
    };
};

/**
 * Маппинг ключей Laravel flash → тип vue-sonner toast.
 * Поддерживает: success, error, warning, info, message.
 */
const flashToastMap = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
    message: 'message',
};

/**
 * Авто-показ тостов из Inertia flash.
 *
 * Вызови один раз в AppLayout — и все flash-сообщения из Laravel
 * будут автоматически показаны как тосты.
 *
 * @example
 * // В AppLayout.vue:
 * import { useFlashToasts } from '@/composables/useFlash';
 * useFlashToasts();
 *
 * // В контроллере Laravel:
 * return back()->with('success', 'Сохранено!');
 */
export const useFlashToasts = () => {
    const page = usePage();

    watch(
        () => page.props?.flash,
        (flash) => {
            if (!flash) return;

            for (const [key, type] of Object.entries(flashToastMap)) {
                const message = flash[key];
                if (!message) continue;

                if (type === 'message') {
                    toast(message);
                } else {
                    toast[type](message);
                }
            }
        },
        { immediate: true },
    );
};
