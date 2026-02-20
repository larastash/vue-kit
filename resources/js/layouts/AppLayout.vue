<script setup>
import Modals from '@/components/Modals.vue';
import Toaster from '@/components/Toaster.vue';
import { useFlashToasts } from '@/composables/useFlash';

useFlashToasts();
</script>

<template>
    <slot />
    <Modals :close-on-backdrop="false" />
    <Toaster />
</template>