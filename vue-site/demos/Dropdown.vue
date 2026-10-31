<script setup lang="ts">
import { ref } from 'vue';
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownFooter,
  DropdownHeader,
  Icon,
  Input,
  Select,
  Switch,
} from '../../vue';
import type { SelectOption } from '../../vue';

const open = ref(false);
const query = ref('');
const radius = ref('8');
const clouds = ref(true);

const projections: SelectOption[] = [
  { value: '4326', label: 'WGS 84' },
  { value: '3857', label: 'Web Mercator' },
];
const crs = ref('4326');
</script>

<template>
  <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center">
    <Dropdown v-model:open="open" label="Filters" :width="288" close-on-action>
      <template #trigger>
        <Icon name="sliders" :size="13" />
        <span>Filters</span>
        <Icon name="chevron-down" :size="11" />
      </template>

      <DropdownHeader title="Imagery" hint="Applies to the active layer" />

      <div style="display: grid; gap: 12px; padding: 12px">
        <Input v-model="query" placeholder="Search tiles…" size="sm">
          <template #prefix><Icon name="search" :size="12" /></template>
        </Input>

        <Select v-model="crs" :options="projections" size="sm" label="Projection" />

        <Input v-model="radius" size="sm" prefix-text="r" suffix-text="px" />

        <Switch v-model="clouds" size="sm" label="Mask clouds" />
        <Checkbox :model-value="true" label="Include archived" />
      </div>

      <DropdownFooter>
        <Button variant="ghost" size="sm" data-dropdown-close>Reset</Button>
        <Button variant="primary" size="sm" data-dropdown-close>Apply</Button>
      </DropdownFooter>
    </Dropdown>

    <Dropdown label="Plain panel" align="end" :width="220">
      <template #trigger>Plain</template>
      <div style="padding: 14px; font-size: 12px; color: var(--cs-text-secondary)">
        Anything can live in the panel — this is just a box that closes when focus
        leaves it.
      </div>
    </Dropdown>

    <Dropdown label="Disabled" disabled>
      <template #trigger>Disabled</template>
      <div />
    </Dropdown>

    <div style="font-size: 12px; color: var(--cs-text-tertiary)">
      open: <strong style="color: var(--cs-text-secondary)">{{ open }}</strong>
    </div>
  </div>
</template>
