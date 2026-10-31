<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { classOf, styleOf, withoutClassStyle } from '../lib/attrs';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    disabled?: boolean;
    /** Monospace affix, e.g. a unit such as "km" or a protocol. */
    prefixText?: string;
    suffixText?: string;
  }>(),
  { size: 'md', invalid: false, disabled: false },
);

const emit = defineEmits<{ 'update:modelValue': [string] }>();

// Bind `value` only when the field is bound. Without a modelValue the input
// stays uncontrolled and a plain `value="…"` attribute passes straight through.
const valueBinding = computed(() => (props.modelValue === undefined ? {} : { value: props.modelValue }));

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div
    :class="cx('cs-input-shell', size !== 'md' && `cs-input-shell--${size}`, classOf($attrs))"
    :style="styleOf($attrs)"
    :data-invalid="invalid || undefined"
    :data-disabled="disabled || undefined"
  >
    <span v-if="$slots.prefix" class="cs-input-shell__affix"><slot name="prefix" /></span>
    <span v-if="prefixText" class="cs-input-shell__affix cs-input-shell__affix--mono">
      {{ prefixText }}
    </span>
    <input
      class="cs-input-shell__input"
      :disabled="disabled"
      :aria-invalid="invalid || undefined"
      v-bind="{ ...withoutClassStyle($attrs), ...valueBinding }"
      @input="onInput"
    />
    <span v-if="suffixText" class="cs-input-shell__affix cs-input-shell__affix--mono">
      {{ suffixText }}
    </span>
    <span v-if="$slots.suffix" class="cs-input-shell__affix"><slot name="suffix" /></span>
  </div>
</template>
