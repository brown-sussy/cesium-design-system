<script setup lang="ts">
import { ref } from 'vue';
import { Composer } from '../../vue';

const draft = ref('');
const busy = ref(false);
const sent = ref<string[]>([]);

function send() {
  if (!draft.value.trim()) return;
  sent.value = [draft.value, ...sent.value].slice(0, 3);
  draft.value = '';
}
</script>

<template>
  <div style="display: grid; gap: 16px; width: 100%; max-width: 480px">
    <Composer
      v-model="draft"
      placeholder="Ask about the scene…"
      hint="Enter to send, Shift+Enter for a newline"
      :max-length="280"
      :busy="busy"
      aria-label="Message"
      @send="send"
      @stop="busy = false"
    />

    <div style="display: flex; gap: 8px">
      <button
        type="button"
        style="
          font: inherit;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid var(--cs-border-subtle);
          background: transparent;
          color: var(--cs-text-secondary);
          cursor: pointer;
        "
        @click="busy = !busy"
      >
        {{ busy ? 'Mark idle' : 'Mark busy' }}
      </button>
      <span style="font-size: 12px; color: var(--cs-text-tertiary)">
        {{ busy ? 'Send becomes Stop' : 'Send is disabled while empty' }}
      </span>
    </div>

    <Composer model-value="Disabled composer" disabled aria-label="Disabled" />

    <ol
      v-if="sent.length"
      style="display: grid; gap: 6px; font-size: 12px; color: var(--cs-text-secondary); margin: 0; padding-left: 18px"
    >
      <li v-for="(line, i) in sent" :key="i">{{ line }}</li>
    </ol>
  </div>
</template>
