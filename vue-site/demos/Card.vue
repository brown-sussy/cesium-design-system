<script setup lang="ts">
import { Button, Card, CardBody, CardFooter, CardHeader, Icon } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 16px; width: 100%; max-width: 720px; grid-template-columns: 1fr 1fr">
    <Card>
      <CardHeader title="Terrain" desc="Quantised-mesh, 30 m">
        <template #actions>
          <Button variant="ghost" size="sm">Edit</Button>
        </template>
      </CardHeader>
      <CardBody>
        <div style="font-size: 13px; color: var(--cs-text-secondary); line-height: 1.55">
          Elevation sampled from the 2019 survey. Exaggeration is applied at render
          time, so the source data stays at true scale.
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="secondary" size="sm">Download</Button>
        <Button variant="primary" size="sm">Apply</Button>
      </CardFooter>
    </Card>

    <Card accent>
      <CardHeader title="Accent" desc="The card is a boundary, not a surface" />
      <CardBody>
        <div style="font-size: 13px; color: var(--cs-text-secondary); line-height: 1.55">
          Use <code>accent</code> for the one card in a group that needs attention.
        </div>
      </CardBody>
    </Card>

    <Card interactive>
      <CardHeader title="Interactive" desc="Hover to lift" />
      <CardBody>
        <div style="font-size: 13px; color: var(--cs-text-secondary)">
          The whole card is the hit target when it links somewhere.
        </div>
      </CardBody>
    </Card>

    <Card flush>
      <div style="padding: 16px; display: flex; gap: 10px; align-items: center">
        <Icon name="layers" :size="15" />
        <span style="font-size: 13px">Flush — no body padding, for tables and lists.</span>
      </div>
    </Card>
  </div>
</template>
