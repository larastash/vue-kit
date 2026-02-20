import { ref, readonly } from 'vue';

const visible = ref(false);
const state = ref(null);

let resolvePromise = null;

/**
 * Программный confirm-диалог через Promise.
 *
 * @example
 * const { confirm } = useConfirm();
 *
 * const ok = await confirm({
 *     title: 'Удалить запись?',
 *     message: 'Это действие нельзя отменить.',
 *     confirmText: 'Удалить',
 *     cancelText: 'Отмена',
 *     variant: 'danger',
 * });
 *
 * if (ok) { ... }
 */
export const useConfirm = () => {
    const confirm = (options = {}) => {
        state.value = {
            title: options.title ?? 'Подтверждение',
            message: options.message ?? 'Вы уверены?',
            confirmText: options.confirmText ?? 'Подтвердить',
            cancelText: options.cancelText ?? 'Отмена',
            variant: options.variant ?? 'default',
        };

        visible.value = true;

        return new Promise((resolve) => {
            resolvePromise = resolve;
        });
    };

    const accept = () => {
        visible.value = false;
        resolvePromise?.(true);
        resolvePromise = null;
    };

    const cancel = () => {
        visible.value = false;
        resolvePromise?.(false);
        resolvePromise = null;
    };

    return {
        visible: readonly(visible),
        state: readonly(state),
        confirm,
        accept,
        cancel,
    };
};
