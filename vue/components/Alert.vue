<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import type { AlertTone } from '../types';
import type { IconName } from '../lib/icons';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    tone?: AlertTone;
    title?: string;
    /** Hide the leading glyph entirely. The `icon` slot replaces it. */
    hideIcon?: boolean;
    /** Renders the dismiss control. Listen for `@close`. */
    dismissible?: boolean;
  }>(),
  { tone: 'neutral', hideIcon: false, dismissible: false },
);

const emit = defineEmits<{ close: [] }>();

const toneIcon: Record<AlertTone, IconName> = {
  accent: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  neutral: 'info',
};

const glyph = computed(() => toneIcon[props.tone]);
</script>

<template>
  <div :class="cx('cs-alert', tone !== 'neutral' && `cs-alert--${tone}`)" role="status">
    <span v-if="!hideIcon" class="cs-alert__icon">
      <slot name="icon"><Icon :name="glyph" :size="15" /></slot>
    </span>
    <div class="cs-alert__content">
      <div v-if="title" class="cs-alert__title">{{ title }}</div>
      <div v-if="$slots.default" class="cs-alert__desc"><slot /></div>
    </div>
    <button v-if="dismissible" type="button" class="cs-alert__close" aria-label="Dismiss" @click="emit('close')">
      <Icon name="close" :size="12" />
    </button>
  </div>
</template>
