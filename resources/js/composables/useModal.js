import { computed, markRaw, ref, watch } from 'vue';

const stack = ref([]);

const createId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

const updateBodyScrollLock = () => {
    if (typeof document === 'undefined') return;
    const hasOpen = stack.value.length > 0;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = hasOpen ? 'hidden' : '';
    document.body.style.paddingRight = hasOpen && scrollbar ? `${scrollbar}px` : '';
    document.body.dataset.modalOpen = hasOpen ? 'true' : 'false';
};

watch(() => stack.value.length, updateBodyScrollLock, { immediate: true });

export const useModal = () => {
    const open = (component, props = {}, options = {}) => {
        const id = options.id || createId();

        stack.value.push({
            id,
            component: markRaw(component),
            props,
            options,
        });

        return id;
    };

    const close = (reason = 'manual') => {
        if (stack.value.length === 0) return;
        const modal = stack.value.pop();
        modal.options?.onClose?.(reason);
    };

    const closeById = (id, reason = 'manual') => {
        const index = stack.value.findIndex((m) => m.id === id);
        if (index !== -1) {
            const [modal] = stack.value.splice(index, 1);
            modal.options?.onClose?.(reason);
        }
    };

    const closeAll = (reason = 'manual') => {
        while (stack.value.length) {
            close(reason);
        }
    };

    const replace = (component, props = {}, options = {}) => {
        if (stack.value.length) {
            stack.value.pop();
        }
        return open(component, props, options);
    };

    const updateProps = (newProps, id = null) => {
        const modal = id
            ? stack.value.find((m) => m.id === id)
            : stack.value[stack.value.length - 1];

        if (modal) {
            modal.props = { ...modal.props, ...newProps };
        }
    };

    const modals = computed(() => stack.value);
    const top = computed(() => (stack.value.length ? stack.value.at(-1) : null));
    const hasOpenModals = computed(() => stack.value.length > 0);

    return {
        modals,
        open,
        close,
        closeById,
        closeAll,
        replace,
        updateProps,
        top,
        hasOpenModals,
    };
};
