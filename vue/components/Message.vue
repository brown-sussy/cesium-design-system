<script setup lang="ts">
import { cx } from '../lib/cx';
import type { MessageMeta, MessageRole } from '../types';

withDefaults(
  defineProps<{
    role: MessageRole;
    /** Display name, when the role alone is not enough. */
    author?: string;
    time?: string;
    /** Adds the caret and announces the message as still arriving. */
    streaming?: boolean;
    /** Token count, latency — anything the transcript should admit to. */
    meta?: MessageMeta[];
  }>(),
  { streaming: false },
);
</script>

<template>
  <li
    :class="cx('cs-msg')"
    :data-role="role"
    :data-streaming="streaming || undefined"
    :aria-busy="streaming || undefined"
  >
    <div class="cs-msg__head">
      <span class="cs-msg__role">{{ role }}</span>
      <span v-if="author" class="cs-msg__author">{{ author }}</span>
      <span v-if="time" class="cs-msg__time">{{ time }}</span>
    </div>

    <div class="cs-msg__body"><slot /></div>

    <div v-if="$slots.actions || meta" class="cs-msg__foot">
      <span v-if="meta" class="cs-msg__meta">
        <span v-for="item in meta" :key="item.label">{{ item.label }} {{ item.value }}</span>
      </span>
      <slot name="actions" />
    </div>
  </li>
</template>
