<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: number }>(), { size: 430 });

const R = 150;
const C = 200;

const latitudes = [-60, -30, 0, 30, 60].map((lat) => {
  const rad = (lat * Math.PI) / 180;
  return {
    lat,
    cy: C - Math.sin(rad) * R,
    rx: Math.cos(rad) * R,
    ry: Math.cos(rad) * R * 0.19,
  };
});

const longitudes = Array.from({ length: 11 }, (_, i) => (i - 5) * 15).map((lon) => {
  const rad = (lon * Math.PI) / 180;
  return {
    lon,
    rx: Math.abs(Math.cos(rad)) * R,
  };
});
</script>

<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 400"
    fill="none"
    aria-hidden="true"
    style="overflow: visible"
  >
    <defs>
      <radialGradient id="cs-globe-body-vue" cx="34%" cy="26%" r="82%">
        <stop offset="0%" stop-color="var(--cs-accent)" stop-opacity="0.20" />
        <stop offset="46%" stop-color="var(--cs-accent)" stop-opacity="0.06" />
        <stop offset="100%" stop-color="var(--cs-accent)" stop-opacity="0.01" />
      </radialGradient>
      <radialGradient id="cs-globe-rim-vue" cx="50%" cy="50%" r="50%">
        <stop offset="88%" stop-color="var(--cs-accent)" stop-opacity="0" />
        <stop offset="97%" stop-color="var(--cs-accent)" stop-opacity="0.34" />
        <stop offset="100%" stop-color="var(--cs-accent)" stop-opacity="0" />
      </radialGradient>
      <filter id="cs-globe-blur-vue" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <clipPath id="cs-globe-clip-vue">
        <circle :cx="C" :cy="C" :r="R" />
      </clipPath>
    </defs>

    <!-- atmosphere halo -->
    <circle
      :cx="C"
      :cy="C"
      :r="R + 7"
      fill="url(#cs-globe-rim-vue)"
      filter="url(#cs-globe-blur-vue)"
      opacity="0.8"
    />

    <!-- body -->
    <circle :cx="C" :cy="C" :r="R" fill="url(#cs-globe-body-vue)" />

    <g clip-path="url(#cs-globe-clip-vue)">
      <ellipse
        v-for="l in latitudes"
        :key="`lat-${l.lat}`"
        :cx="C"
        :cy="l.cy"
        :rx="l.rx"
        :ry="l.ry"
        stroke="var(--cs-accent)"
        :stroke-opacity="l.lat === 0 ? 0.3 : 0.16"
        :stroke-width="l.lat === 0 ? 1 : 0.75"
      />
      <ellipse
        v-for="l in longitudes"
        :key="`lon-${l.lon}`"
        :cx="C"
        :cy="C"
        :rx="Math.max(l.rx, 0.6)"
        :ry="R"
        stroke="var(--cs-accent)"
        :stroke-opacity="l.lon === 0 ? 0.26 : 0.13"
        :stroke-width="l.lon === 0 ? 1 : 0.75"
      />
    </g>

    <!-- limb -->
    <circle :cx="C" :cy="C" :r="R" stroke="var(--cs-accent)" stroke-opacity="0.5" stroke-width="1" />

    <!-- station marker with radar pulse rings -->
    <g>
      <circle :cx="C + 58" :cy="C - 92" :r="3.2" fill="var(--cs-accent)" />
      <circle
        class="globe-ping"
        :cx="C + 58"
        :cy="C - 92"
        :r="8"
        stroke="var(--cs-accent)"
        stroke-opacity="0.4"
        stroke-width="0.9"
      />
      <circle
        class="globe-ping globe-ping--late"
        :cx="C + 58"
        :cy="C - 92"
        :r="8"
        stroke="var(--cs-accent)"
        stroke-opacity="0.4"
        stroke-width="0.9"
      />
    </g>
  </svg>
</template>
