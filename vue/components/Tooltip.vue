<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(
  defineProps<{
    /** Bubble text. Use the `content` slot for anything richer. */
    content?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Horizontal alignment for `top` / `bottom`. Use `end` on controls pinned
     * to the right edge of the viewport, where a centred bubble would overflow.
     */
    align?: 'center' | 'end';
  }>(),
  { placement: 'top', align: 'center' },
);
</script>

<template>
  <span class="cs-tooltip-anchor">
    <slot />
    <span
      role="tooltip"
      :class="
        cx(
          'cs-tooltip',
          `cs-tooltip--${placement}`,
          (placement === 'top' || placement === 'bottom') && align === 'end' && 'cs-tooltip--end',
        )
      "
    >
      <slot name="content">{{ content }}</slot>
    </span>
  </span>
</template>
