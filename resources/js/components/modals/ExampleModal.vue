<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useModal } from '@/composables/useModal';

const { close } = useModal();

const handleKeydown = (e) => {
    if (e.key === 'Escape') {
        close();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
});

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});
</script>

<template>
    <div
        class="bg-white dark:bg-black rounded-brand shadow-xl shadow-gray-950/5 w-full max-w-md overflow-hidden border transform transition-all"
        role="dialog"
        aria-modal="true"
    >
        <div class="px-6 py-4 border-b flex justify-between items-center">
            <h3 class="dark:text-white font-medium">
                {{ title }}
            </h3>
        </div>

        <div class="px-6 py-4">
            <p>
                {{ message }}
            </p>
        </div>

        <div class="px-6 py-4 border-t bg-gray-50 dark:bg-black flex justify-end gap-3">
            <button
                @click="close()"
                class="px-6 py-1.5 font-medium bg-white dark:text-black border rounded-brand"
            >
                Cancel
            </button>
        </div>
    </div>
</template>
