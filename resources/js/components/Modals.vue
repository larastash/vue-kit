<script setup>
import { useModal } from '@/composables/useModal';

const props = defineProps({
    closeOnBackdrop: {
        type: Boolean,
        default: false
    }
});

const { modals, closeById, hasOpenModals } = useModal();

const handleBackdropClick = (modalId) => {
    if (props.closeOnBackdrop) {
        closeById(modalId);
    }
};
</script>

<template>
    <Teleport to="body">
        <div class="fixed inset-0 z-1000 pointer-events-none" :class="{ 'pointer-events-auto': hasOpenModals }">
            <Transition name="fade">
                <div v-if="hasOpenModals" class="absolute inset-0 bg-black/50 backdrop-blur" aria-hidden="true">
                </div>
            </Transition>
            <TransitionGroup name="modal" tag="div" class="absolute inset-0 flex items-center justify-center p-4">
                <div v-for="(modal, index) in modals" :key="modal.id"
                    class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    :style="{ zIndex: 100 + index }">
                    <div class="absolute inset-0 pointer-events-auto" @click="handleBackdropClick(modal.id)"></div>

                    <div class="relative z-10 pointer-events-auto transition-all w-full flex justify-center">
                        <component :is="modal.component" v-bind="modal.props" @close="closeById(modal.id)" />
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
}

.modal-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
}
</style>
