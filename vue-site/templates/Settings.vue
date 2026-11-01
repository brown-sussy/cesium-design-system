<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import {
  Avatar,
  Badge,
  Button,
  Field,
  Icon,
  Input,
  Panel,
  PanelBody,
  Select,
  Sidebar,
  Switch,
  Tabs,
  type SidebarSection,
} from '../../vue';

/**
 * Settings page — the system's app shell: a 252px sidebar that folds to a 56px
 * rail under 900px, and a single column of panels that never exceeds a readable
 * measure. One save action, pinned to the header.
 */
const sections: SidebarSection[] = [
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: 'sliders', active: true },
      { id: 'security', label: 'Security', icon: 'crosshair' },
      { id: 'sessions', label: 'Sessions', icon: 'activity', badge: 2 },
    ],
  },
  {
    id: 'workspace',
    title: 'Workspace',
    items: [
      { id: 'members', label: 'Members', icon: 'layers', badge: 18 },
      { id: 'roles', label: 'Roles', icon: 'grid' },
      { id: 'domains', label: 'Domains', icon: 'globe' },
    ],
  },
  {
    id: 'developer',
    title: 'Developer',
    items: [
      { id: 'keys', label: 'API keys', icon: 'command' },
      { id: 'webhooks', label: 'Webhooks', icon: 'zap' },
    ],
  },
];

const timezones = [
  { value: 'utc', label: 'UTC — Coordinated Universal Time' },
  { value: 'lisbon', label: 'Europe/Lisbon' },
  { value: 'new-york', label: 'America/New_York' },
  { value: 'tokyo', label: 'Asia/Tokyo' },
];

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'danger', label: 'Danger zone' },
];

/**
 * The three notification rows are the same shape, so they are data rather than
 * three copies of one block. `reactive` lets each switch own its value without
 * a separate ref per row.
 */
const notifications = reactive([
  { title: 'Scene alerts', hint: 'Frame budget and stream failures.', on: true },
  { title: 'Weekly digest', hint: 'Ingest volume, cost and top scenes.', on: false },
  { title: 'Product updates', hint: 'Roughly once a month.', on: true },
]);

const tab = ref('profile');
const timezone = ref('utc');
const rail = ref(false);

/**
 * Fold the sidebar to a rail when the window gets narrow. A template has no
 * build step of its own, so the breakpoint lives in one `matchMedia` here.
 */
let mq: MediaQueryList | undefined;
const syncRail = () => {
  rail.value = mq?.matches ?? false;
};

onMounted(() => {
  mq = window.matchMedia('(max-width: 900px)');
  syncRail();
  mq.addEventListener('change', syncRail);
});

onBeforeUnmount(() => mq?.removeEventListener('change', syncRail));
</script>

<template>
  <div class="tpl tpl-settings">
    <Sidebar label="Settings" :sections="sections" :collapsed="rail">
      <template #header>
        <div v-if="rail" class="tpl-settings__rail-avatar">
          <Avatar name="Ada Okonjo" size="sm" accent />
        </div>
        <div v-else class="tpl-settings__who">
          <Avatar name="Ada Okonjo" size="sm" accent />
          <span class="tpl-settings__who-copy">
            <span class="cs-t-sm tpl-settings__who-name">Ada Okonjo</span>
            <span class="cs-t-2xs cs-dimmer">Owner</span>
          </span>
        </div>
      </template>

      <template #footer>
        <div class="tpl-settings__foot">
          <span class="cs-mono cs-t-2xs cs-dimmer">{{ rail ? '2.4' : 'v2.4.1' }}</span>
        </div>
      </template>
    </Sidebar>

    <main class="tpl-settings__main">
      <header class="tpl-settings__bar">
        <div class="tpl-settings__bar-title">
          <div class="cs-eyebrow">Settings</div>
        </div>
        <div class="tpl-settings__bar-actions">
          <Button variant="ghost" size="sm">Discard</Button>
          <Button variant="primary" size="sm">Save changes</Button>
        </div>
      </header>

      <div class="tpl-settings__body">
        <h1 class="tpl-settings__h1">Profile</h1>
        <p class="cs-t-sm tpl-settings__lede">
          How you appear to the rest of the workspace, and what this console does by default.
        </p>

        <Tabs v-model="tab" :items="tabs" aria-label="Profile sections" />

        <div class="tpl-settings__panels">
          <template v-if="tab === 'profile'">
            <Panel title="Identity">
              <PanelBody>
                <div class="tpl-settings__identity">
                  <Avatar name="Ada Okonjo" size="lg" accent />
                  <div class="tpl-settings__identity-copy">
                    <div class="cs-t-base">Ada Okonjo</div>
                    <div class="cs-t-xs cs-dimmer">ada@meridian.systems</div>
                  </div>
                  <Button variant="secondary" size="sm">Change photo</Button>
                </div>

                <div class="tpl-settings__fields">
                  <!-- A plain `value` attribute, not `model-value`: with no
                       binding the field stays uncontrolled, which is what a
                       seeded form field wants. -->
                  <Field label="Full name" html-for="s-name">
                    <Input id="s-name" value="Ada Okonjo" />
                  </Field>
                  <Field
                    label="Email"
                    html-for="s-email"
                    hint="Changing this sends a verification link."
                  >
                    <Input id="s-email" value="ada@meridian.systems" />
                  </Field>
                </div>
              </PanelBody>
            </Panel>

            <Panel title="Locale">
              <PanelBody>
                <Field
                  label="Time zone"
                  html-for="s-tz"
                  hint="Timestamps in the console use this zone."
                >
                  <Select
                    id="s-tz"
                    v-model="timezone"
                    :options="timezones"
                    label="Time zone"
                  />
                </Field>
              </PanelBody>
            </Panel>
          </template>

          <Panel v-else-if="tab === 'preferences'" title="Notifications">
            <PanelBody>
              <div v-for="row in notifications" :key="row.title" class="tpl-settings__row">
                <div>
                  <div class="cs-t-base">{{ row.title }}</div>
                  <div class="cs-t-xs cs-dimmer tpl-settings__row-hint">{{ row.hint }}</div>
                </div>
                <div class="tpl-settings__row-control">
                  <Switch v-model="row.on" label="Email" />
                </div>
              </div>
            </PanelBody>
          </Panel>

          <Panel v-else>
            <template #title>
              <span class="tpl-settings__danger-title">
                Danger zone
                <Badge tone="danger">Irreversible</Badge>
              </span>
            </template>
            <PanelBody>
              <p class="cs-t-sm tpl-settings__danger-text">
                Deleting the workspace removes 18 members, 4.2 TB of cached tiles and every API key.
                Billing stops immediately.
              </p>
              <div class="tpl-settings__danger-actions">
                <Button variant="danger-ghost">
                  <template #icon-left><Icon name="warning" :size="13" /></template>
                  Delete workspace
                </Button>
                <Button variant="ghost">Transfer ownership</Button>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>
    </main>
  </div>
</template>
