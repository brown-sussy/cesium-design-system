<script setup lang="ts">
import { computed } from 'vue';
import { Icon, Kbd, Menu, Tooltip } from '../../vue';
import type { MenuEntry, MenuItem } from '../../vue/types';
import { navigate } from '../lib/router';
import { useStyle, useTheme } from '../lib/theme';

const emit = defineEmits<{ search: []; 'toggle-menu': [] }>();

const { theme, toggle } = useTheme();
const { style, setStyle } = useStyle();

const styleItems = computed<MenuEntry[]>(() => [
  { header: 'Shape preset' },
  { id: 'classic', label: 'Cesium — instrument', checked: style.value === 'classic' },
  { id: 'plus', label: 'Plus — continuous', checked: style.value === 'plus' },
]);

function onStyleSelect(item: MenuItem) {
  setStyle(item.id === 'plus' ? 'plus' : 'classic');
}
</script>

<template>
  <header class="doc-header">
    <button
      type="button"
      class="doc-header__icon-btn doc-header__menu"
      aria-label="Menu"
      @click="emit('toggle-menu')"
    >
      <Icon name="menu" :size="16" />
    </button>

    <a
      class="doc-header__brand"
      href="#/"
      @click.prevent="navigate('/')"
    >
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="site-logo-glow" cx="34%" cy="26%" r="70%">
            <stop offset="0%" stop-color="var(--cs-accent)" stop-opacity="0.42" />
            <stop offset="70%" stop-color="var(--cs-accent)" stop-opacity="0.04" />
            <stop offset="100%" stop-color="var(--cs-accent)" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="13" fill="url(#site-logo-glow)" />
        <circle cx="16" cy="16" r="13" stroke="var(--cs-accent)" stroke-opacity="0.62" stroke-width="1" />
        <ellipse cx="16" cy="16" rx="13" ry="4.7" stroke="var(--cs-accent)" stroke-opacity="0.32" stroke-width="0.8" />
        <ellipse cx="16" cy="16" rx="5.1" ry="13" stroke="var(--cs-accent)" stroke-opacity="0.32" stroke-width="0.8" />
        <circle cx="16" cy="16" r="1.7" fill="var(--cs-accent)" />
      </svg>
      <span class="doc-wordmark">
        <span class="doc-wordmark__main">Cesium</span>
        <span class="doc-wordmark__sub">Design System</span>
      </span>
      <span class="site-mark">Vue</span>
    </a>

    <span class="doc-header__spacer" />

    <button
      type="button"
      class="doc-search-btn"
      aria-label="Search components"
      @click="emit('search')"
    >
      <Icon name="search" :size="13" />
      <span class="doc-search-btn__text">Search…</span>
      <Kbd>⌘K</Kbd>
    </button>

    <Menu
      class="doc-style"
      align="end"
      :width="210"
      label="Shape preset"
      :items="styleItems"
      @select="onStyleSelect"
    >
      <template #trigger>
        <span class="doc-style__swatch" aria-hidden="true" />
        <span>{{ style === 'plus' ? 'Plus' : 'Cesium' }}</span>
        <Icon name="chevron-down" :size="11" class="cs-menu__caret" />
      </template>
    </Menu>

    <!-- Absolute, like the React header's link back: the two dev servers run on
         different ports, so a relative href would resolve to the wrong site. -->
    <a class="site-switch" href="https://brown-sussy.github.io/cesium-design-system/">
      React
    </a>

    <Tooltip :content="theme === 'dark' ? 'Light theme' : 'Dark theme'" placement="bottom" align="end">
      <button
        type="button"
        class="doc-header__icon-btn"
        :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        @click="toggle"
      >
        <Icon :name="theme === 'dark' ? 'sun' : 'moon'" :size="15" />
      </button>
    </Tooltip>
  </header>
</template>
