<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { Icon } from '../../vue';
import { highlight } from '../../docs/lib/highlight';

const props = withDefaults(
  defineProps<{ code: string; lang?: string; showHead?: boolean }>(),
  { lang: 'vue', showHead: true },
);

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    timer = setTimeout(() => (copied.value = false), 1400);
  } catch {
    /* clipboard denied — the code is selectable either way */
  }
}

onBeforeUnmount(() => clearTimeout(timer));

// `highlight` escapes the source before wrapping tokens, so this is a
// transformation of a string we control, not of user input.
const html = computed(() => highlight(props.code));
</script>

<template>
  <div class="code-block">
    <div v-if="showHead" class="code-block__head">
      <span class="code-block__lang">{{ lang }}</span>
      <button type="button" class="code-block__copy" :data-copied="copied" @click="copy">
        <Icon :name="copied ? 'check' : 'copy'" :size="10" />
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <pre><code v-html="html" /></pre>
  </div>
</template>
