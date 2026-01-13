<script setup>
import { reactive, watchEffect } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  init: { type: Function, default: null },
  effect: { type: Function, default: null }
})

const state = reactive(props.data)

if (props.init) {
  props.init(state)
}

if (props.effect) {
  watchEffect(() => props.effect(state))
}
</script>

<template>
  <slot
    :data="state"
    v-bind="state"
  ></slot>
</template>
