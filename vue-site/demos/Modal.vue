<script setup lang="ts">
import { ref } from 'vue';
import { Button, Field, Input, Modal, Textarea } from '../../vue';

const basic = ref(false);
const confirm = ref(false);
</script>

<template>
  <div style="display: flex; gap: 10px">
    <Button variant="secondary" @click="basic = true">Open modal</Button>
    <Button variant="primary" @click="confirm = true">Destructive</Button>

    <Modal
      :open="basic"
      title="Publish layer"
      description="Kessler Ridge will be visible to everyone in the workspace."
      :width="480"
      @close="basic = false"
    >
      <div style="display: grid; gap: 16px">
        <Field label="Release name" hint="Defaults to the layer name and date.">
          <Input model-value="Kessler Ridge — 12 May" />
        </Field>
        <Field label="Notes">
          <Textarea placeholder="What changed?" :rows="3" />
        </Field>
      </div>

      <template #footer>
        <Button variant="ghost" @click="basic = false">Cancel</Button>
        <Button variant="primary" @click="basic = false">Publish</Button>
      </template>
    </Modal>

    <Modal
      :open="confirm"
      title="Delete layer?"
      description="This removes 1,284 tiles and cannot be undone."
      :width="420"
      :close-on-overlay="false"
      @close="confirm = false"
    >
      <template #footer>
        <Button variant="ghost" @click="confirm = false">Keep it</Button>
        <Button variant="danger" @click="confirm = false">Delete</Button>
      </template>
    </Modal>
  </div>
</template>
