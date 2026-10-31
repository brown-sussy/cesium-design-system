<script setup lang="ts">
import { ref } from 'vue';
import { Field, Input, Select } from '../../vue';
import type { SelectOption } from '../../vue';

const name = ref('Kessler Ridge');
const email = ref('not-an-email');

const crs: SelectOption[] = [
  { value: '4326', label: 'WGS 84' },
  { value: '3857', label: 'Web Mercator' },
];
const datum = ref('4326');
</script>

<template>
  <div style="display: grid; gap: 20px; width: 300px">
    <Field label="Layer name" hint="Shown in the layer switcher." html-for="layer-name">
      <Input id="layer-name" v-model="name" />
    </Field>

    <Field label="Contact" error="That address is missing a domain." required html-for="layer-email">
      <Input id="layer-email" v-model="email" invalid />
    </Field>

    <Field label="Horizontal CRS" required>
      <Select v-model="datum" :options="crs" />
    </Field>
  </div>
</template>
