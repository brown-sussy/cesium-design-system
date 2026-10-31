<script setup lang="ts">
import { MessageList, Message, TypingIndicator } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 20px; width: 100%; max-width: 480px">
    <TypingIndicator />

    <TypingIndicator label="Searching 84 tiles" />

    <MessageList label="Conversation">
      <Message role="assistant" author="Atlas">
        Checking the terrain provider for that bounding box.
      </Message>
      <li style="list-style: none; padding: 0 0 0 2px">
        <TypingIndicator />
      </li>
    </MessageList>
  </div>
</template>
