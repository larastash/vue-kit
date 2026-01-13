<template>
    <slot />
    <Modals :close-on-backdrop="false" />
    <Toaster />
</template>

<script setup>
import Modals from '@/components/Modals.vue';
import Toaster from '@js/components/Toaster.vue';
</script>