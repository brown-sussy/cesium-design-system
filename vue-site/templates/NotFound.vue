<script setup lang="ts">
import { Button, Icon } from '../../vue';

/**
 * 404 — the system's "signal lost" page. A mono readout does the apologising;
 * the two actions are the only things that carry weight.
 *
 * This is a page, not a component demo: it fills the frame it is given and
 * carries its own grid and glow, so it reads the same standalone as it does
 * inside the docs stage.
 */
</script>

<template>
  <div class="tpl tpl--centred tpl-notfound">
    <svg class="tpl-notfound__reticle" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="72" fill="none" stroke="var(--cs-accent)" stroke-opacity="0.28" />
      <circle cx="100" cy="100" r="46" fill="none" stroke="var(--cs-accent)" stroke-opacity="0.18" />
      <path
        d="M100 18v22M100 160v22M18 100h22M160 100h22"
        stroke="var(--cs-accent)"
        stroke-opacity="0.5"
      />
      <circle cx="100" cy="100" r="2.5" fill="var(--cs-accent)" />
    </svg>

    <div class="tpl-notfound__body">
      <span class="cs-mono cs-t-2xs cs-dimmer tpl-notfound__code">ERR 404 · NO FIX</span>

      <div class="cs-mono tpl-notfound__numeral">404</div>

      <h1 class="tpl-notfound__title">
        This tile never <em>resolved.</em>
      </h1>

      <p class="cs-t-md tpl-notfound__lede">
        The route you asked for is not in this scene. It may have been renamed, or the link may
        have been copied before the last deploy.
      </p>

      <div class="cs-row tpl-notfound__actions">
        <Button variant="primary">
          <template #icon-left><Icon name="chevron-left" :size="13" /></template>
          Back to the console
        </Button>
        <Button variant="secondary">
          Status page
          <template #icon-right><Icon name="external" :size="13" /></template>
        </Button>
      </div>

      <div class="cs-row tpl-notfound__request">
        <span class="cs-mono cs-t-2xs cs-dimmer">GET</span>
        <span class="cs-mono cs-t-2xs tpl-notfound__path">
          /scenes/north-sea/tileset/18/142031/96184
        </span>
        <span class="cs-mono cs-t-2xs tpl-notfound__status">404</span>
      </div>
    </div>
  </div>
</template>
