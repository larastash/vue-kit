<template>
    <Head title="Welcome" />

    <AppLayout>
        <div class="absolute top-4 right-4 flex items-center gap-4">
            <button @click="showModal()" class="block text-black dark:text-white">
                <SquareArrowOutUpRightIcon class="shrink-0 size-5" />
            </button>
            <button @click="toggleTheme()" class="block text-black dark:text-white">
                <SunIcon v-if="currentTheme === 'light'" class="shrink-0 size-5" />
                <MoonIcon v-if="currentTheme === 'dark'" class="shrink-0 size-5" />
                <SunMoonIcon v-if="currentTheme === 'system'" class="shrink-0 size-5" />
            </button>
        </div>
        <div class="min-h-dvh flex flex-col items-center justify-center font-mono bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:20px_20px]">
            <figure class="text-center">
                <blockquote>
                <p class="text-lg max-w-lg text-pretty w-full leading-relaxed hyphens-auto">
                    {{ quote }}
                </p>
                </blockquote>
                <figcaption class="mt-4 text-gray-500 dark:text-gray-600">
                    — {{ author }}
                </figcaption>
            </figure>
            <div class="absolute bottom-4 inset-x-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <figure class="shrink-0 size-1.5 rounded-full bg-green-500 dark:bg-green-600 ring-2 ring-green-300 dark:ring-green-500 animate-pulse"></figure>
                        <p class="text-gray-500 dark:text-gray-600">
                            ready for something awesome
                        </p>
                    </div>
                    <a href="https://github.com/larastash/vue-kit" target="_blank" rel="noopener noreferrer" class="text-gray-500 dark:text-gray-600 hover:text-black dark:hover:text-white flex items-center gap-2">
                        <ExternalLinkIcon name="lucide-external-link" class="shrink-0 size-4" />
                        <span>
                            larastash/vue-kit
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@js/layouts/AppLayout.vue';
import { ExternalLinkIcon, MoonIcon, SquareArrowOutUpRightIcon, SunIcon, SunMoonIcon } from 'lucide-vue-next';
import { useTheme } from '@js/composables/useTheme';
import { toast } from 'vue-sonner';
import { onMounted } from 'vue';
import { useModal } from '@/composables/useModal';
import ExampleModal from '@/components/modals/ExampleModal.vue';

const props = defineProps({
    quote: String,
    author: String,
});

const { open } = useModal();

function showModal() {
  open(ExampleModal, {
    title: 'This is a title',
    message: 'This is a custom message for the modal.',
  });
}

const { currentTheme, toggleTheme } = useTheme();

onMounted(() => {
    setTimeout(() => {
        toast.success('Hey there 👋', {
            description: 'This is a toast message.',
        });
    }, 1000);
});
</script>