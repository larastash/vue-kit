import { ref, computed, markRaw } from 'vue';

// Singleton state (shared across all components)
const stack = ref([]);

export const useModal = () => {

    /**
     * Opens a new modal and places it on top of the stack.
     *
     * @param {Object} component - Vue component definition.
     * @param {Object} [props={}] - Props passed to the component.
     * @param {Object} [options={}] - Config: { onClose: Function, id: String }.
     * @returns {string} The ID of the opened modal.
     */
    const open = (component, props = {}, options = {}) => {
        const id = options.id || (Date.now() + Math.random().toString(36).substr(2, 9));

        stack.value.push({
            id,
            component: markRaw(component),
            props,
            options,
        });

        return id;
    };

    /**
     * Closes the TOP-MOST modal (Last In, First Out).
     * Standard 'Back' button behavior.
     */
    const close = () => {
        if (stack.value.length === 0) return;
        const modal = stack.value.pop();
        modal.options?.onClose?.();
    };

    /**
     * Closes a specific modal by its ID.
     * Useful if a modal needs to close itself but isn't necessarily the top one.
     */
    const closeById = (id) => {
        const index = stack.value.findIndex(m => m.id === id);
        if (index !== -1) {
            const [modal] = stack.value.splice(index, 1);
            modal.options?.onClose?.();
        }
    };

    /**
     * Closes ALL currently open modals.
     * Useful on route changes (e.g. navigation guard).
     */
    const closeAll = () => {
        while (stack.value.length > 0) {
            close();
        }
    };

    /**
     * Replaces the top-most modal with a new one.
     * Useful for multi-step wizards (Step 1 -> Step 2) to avoid stack buildup.
     */
    const replace = (component, props = {}, options = {}) => {
        if (stack.value.length > 0) {
            // Remove top without triggering onClose (optional decision, usually safer)
            stack.value.pop();
        }
        return open(component, props, options);
    };

    /**
     * Updates the props of the top-most modal or a specific modal by ID.
     * Useful for loading states inside the modal (e.g. changing 'isLoading' prop).
     */
    const updateProps = (newProps, id = null) => {
        if (stack.value.length === 0) return;

        let modal;
        if (id) {
            modal = stack.value.find(m => m.id === id);
        } else {
            modal = stack.value[stack.value.length - 1]; // Top modal
        }

        if (modal) {
            modal.props = { ...modal.props, ...newProps };
        }
    };

    /**
     * Returns the currently active (top-most) modal object.
     * Useful for checking what is currently open.
     */
    const top = computed(() => {
        return stack.value.length > 0 ? stack.value[stack.value.length - 1] : null;
    });

    return {
        modals: computed(() => stack.value),
        open,
        close,
        closeById,
        closeAll,
        replace,
        updateProps,
        top,
        hasOpenModals: computed(() => stack.value.length > 0),
    };
};
