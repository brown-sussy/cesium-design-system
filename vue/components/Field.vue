<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}>();

/**
 * `#label` is the rich form: a label that carries a second control — a
 * "Forgot?" link beside "Password" — cannot be expressed through a string
 * prop. The prop stays for the common case.
 */
defineSlots<{ default?: () => unknown; label?: () => unknown }>();
</script>

<template>
  <div class="cs-field">
    <label v-if="label || $slots.label" class="cs-field__label" :for="htmlFor">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="cs-field__required" aria-hidden="true">*</span>
    </label>
    <slot />
    <span v-if="error" class="cs-field__error" role="alert">
      <Icon name="error" :size="12" />
      {{ error }}
    </span>
    <span v-else-if="hint" class="cs-field__hint">{{ hint }}</span>
  </div>
</template>
