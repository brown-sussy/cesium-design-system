<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}>();
</script>

<template>
  <div class="cs-field">
    <label v-if="label" class="cs-field__label" :for="htmlFor">
      {{ label }}
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
