<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { classOf, styleOf, withoutClassStyle } from '../lib/attrs';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The group's current value. */
    modelValue?: string;
    value: string;
    name?: string;
    label?: string;
    disabled?: boolean;
  }>(),
  {},
);

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const checked = computed(() => props.modelValue === props.value);
</script>

<template>
  <label :class="cx('cs-check', classOf($attrs))" :style="styleOf($attrs)">
    <input
      type="radio"
      class="cs-check__input"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      v-bind="withoutClassStyle($attrs)"
      @change="emit('update:modelValue', value)"
    />
    <span class="cs-check__box cs-radio__box" aria-hidden="true" />
    <span v-if="label" class="cs-check__label">{{ label }}</span>
  </label>
</template>
