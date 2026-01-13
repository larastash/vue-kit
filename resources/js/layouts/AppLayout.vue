<template>
    <slot />
    <Modals :close-on-backdrop="false" />
    <Toaster />
</template>

<script setup>
import Modals from '@/components/Modals.vue';
import Toaster from '@/components/Toaster.vue';
</script>