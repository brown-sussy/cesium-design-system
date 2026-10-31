<script setup lang="ts">
import { computed, ref } from 'vue';
import { cx } from '../lib/cx';
import Icon from './Icon.vue';

/**
 * The input line of a chat surface. Enter sends, Shift+Enter breaks the line —
 * the same contract every other chat client has, so it is not documented in the
 * UI beyond a mono hint.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    /** Swaps send for stop and blocks Enter. */
    busy?: boolean;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
    rows?: number;
    hint?: string;
    ariaLabel?: string;
  }>(),
  {
    placeholder: 'Ask about the scene…',
    rows: 2,
    hint: '⏎ send · ⇧⏎ line break',
    ariaLabel: 'Message',
    busy: false,
    disabled: false,
  },
);

const emit = defineEmits<{ 'update:modelValue': [string]; send: []; stop: [] }>();

const inner = ref('');
const text = computed(() => props.modelValue ?? inner.value);

const canSend = computed(() => text.value.trim().length > 0 && !props.busy && !props.disabled);
const over = computed(() => props.maxLength !== undefined && text.value.length > props.maxLength);

function setText(next: string) {
  if (props.modelValue === undefined) inner.value = next;
  emit('update:modelValue', next);
}

function onInput(e: Event) {
  setText((e.target as HTMLTextAreaElement).value);
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (canSend.value && !over.value) emit('send');
  }
}
</script>

<template>
  <div :class="cx('cs-composer')" :data-disabled="disabled || undefined" :data-busy="busy || undefined">
    <textarea
      class="cs-composer__input"
      :value="text"
      :rows="rows"
      :placeholder="placeholder"
      :max-length="maxLength"
      :aria-label="ariaLabel"
      @input="onInput"
      @keydown="onKeyDown"
    />

    <div class="cs-composer__bar">
      <button type="button" class="cs-composer__attach" aria-label="Attach a file">
        <Icon name="paperclip" :size="12" />
      </button>

      <span class="cs-composer__hint">{{ hint }}</span>

      <span v-if="maxLength !== undefined" class="cs-composer__count" :data-over="over || undefined">
        {{ text.length }} / {{ maxLength }}
      </span>

      <button
        type="button"
        class="cs-composer__send"
        :data-busy="busy || undefined"
        :disabled="busy ? false : !canSend || over"
        :aria-label="busy ? 'Stop generating' : 'Send message'"
        @click="busy ? emit('stop') : emit('send')"
      >
        <Icon :name="busy ? 'stop' : 'send'" :size="12" />
      </button>
    </div>
  </div>
</template>
