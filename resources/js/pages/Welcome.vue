<script setup>
import { Head } from '@inertiajs/vue3';
import { ExternalLinkIcon, MoonIcon, SquareArrowOutUpRightIcon, SunIcon, SunMoonIcon } from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import Scope from '@/components/Scope.vue';
import ExampleModal from '@/components/modals/ExampleModal.vue';
import { useTheme } from '@/composables/useTheme';
import { useModal } from '@/composables/useModal';

defineProps({
    quote: String,
    author: String,
});

const { currentTheme, toggleTheme } = useTheme();
const { open } = useModal();

const showModal = () => {
    open(ExampleModal, {
        title: 'This is a title',
        message: 'This is a custom message for the modal.',
    });
};
</script>

<template>
    <Head title="Welcome" />

    <AppLayout>
        <div class="absolute top-4 left-4 flex items-center gap-4">
            <Scope
                :data="{ count: 10, double: 0 }"
                :init="(d) => (d.double = d.count * 2)"
                :effect="(d) => (d.double = d.count * 2)"
                v-slot="{ data }"
            >
                <div class="flex items-center gap-2">
                    <button @click="data.count++" class="px-2.5 py-0.5 rounded-brand border">plus</button>
                    <button @click="data.count--" class="px-2.5 py-0.5 rounded-brand border">minus</button>
                    <button @click="data.count *= 2" class="px-2.5 py-0.5 rounded-brand border">double</button>
                    <code>{{ data }}</code>
                </div>
            </Scope>
        </div>

        <div class="absolute top-4 right-4 flex items-center gap-4">
            <button @click="showModal" class="block text-black dark:text-white">
                <SquareArrowOutUpRightIcon class="shrink-0 size-5" />
            </button>
            <button @click="toggleTheme" class="block text-black dark:text-white animate-loader">
                <SunIcon v-if="currentTheme === 'light'" class="shrink-0 size-5" />
                <MoonIcon v-if="currentTheme === 'dark'" class="shrink-0 size-5" />
                <SunMoonIcon v-if="currentTheme === 'system'" class="shrink-0 size-5" />
            </button>
        </div>

        <div class="min-h-dvh flex flex-col items-center justify-center font-mono bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[20px_20px]">
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
                        <figure class="shrink-0 size-1.5 rounded-full bg-green-500 dark:bg-green-600 ring-2 ring-green-300 dark:ring-green-500 animate-pulse" />
                        <p class="text-gray-500 dark:text-gray-600">ready for something awesome</p>
                    </div>
                    <a
                        href="https://github.com/larastash/vue-kit"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-500 dark:text-gray-600 hover:text-black dark:hover:text-white flex items-center gap-2"
                    >
                        <ExternalLinkIcon class="shrink-0 size-4" />
                        <span>larastash/vue-kit</span>
                    </a>
                </div>
            </div>
        </div>
    </AppLayout>
</template>