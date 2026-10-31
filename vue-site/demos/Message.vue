<script setup lang="ts">
import { Button, Message, MessageList } from '../../vue';
import type { MessageMeta } from '../../vue';

const meta: MessageMeta[] = [
  { label: 'tokens', value: 312 },
  { label: 'latency', value: '1.4 s' },
];
</script>

<template>
  <div style="width: 100%; max-width: 520px">
    <MessageList label="Conversation">
      <Message role="user" time="14:02">
        Why is the western ridge still low resolution?
      </Message>

      <Message role="assistant" author="Atlas" time="14:02" :meta="meta">
        Because the terrain provider returned 30 m tiles for that bbox — the 5 m
        set only covers the valley. I can request a re-tile at higher zoom.
      </Message>

      <Message role="tool" time="14:03">
        <code style="font-family: var(--cs-font-mono); font-size: 12px">
          search_tiles(bbox, zoom=16) → 84 tiles
        </code>
      </Message>

      <Message role="assistant" streaming>
        Requesting 84 tiles at zoom 16 — this will take about
      </Message>

      <Message role="system">
        Model switched to <strong>atlas-1-large</strong> mid-conversation.
      </Message>
    </MessageList>

    <div style="margin-top: 14px">
      <MessageList label="With actions">
        <Message role="assistant" author="Atlas">
          Done. The ridge is now streaming at 5 m.
          <template #actions>
            <Button variant="ghost" size="sm">Copy</Button>
            <Button variant="ghost" size="sm">Retry</Button>
          </template>
        </Message>
      </MessageList>
    </div>
  </div>
</template>
