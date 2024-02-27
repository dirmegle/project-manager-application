<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { computed, ref } from 'vue';

const emit = defineEmits(['confirm', 'cancel']);
const props = defineProps({
  currentName: { type: String, required: true }
});

const name = ref(props.currentName);

const isNameProvided = computed(() => name.value.length > 0);

function handleCancel() {
  emit('cancel');
}

function handleConfirmation() {
  emit('confirm', name.value);
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h1 class="heading-large">Change project name:</h1>
      <v-text-field v-model="name" label="New project name" variant="underlined"></v-text-field>
      <div class="button-wrapper">
        <BaseButton
          class="first-button"
          buttonStyle="empty"
          :disabled="!isNameProvided"
          @buttonClicked="handleConfirmation"
          >Confirm</BaseButton
        >
        <BaseButton buttonStyle="empty" :disabled="false" @buttonClicked="handleCancel"
          >Cancel</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 7px;
  box-shadow: rgb(99 99 99 / 20%) 0 2px 8px 0;
}

.modal-content h1 {
  margin-bottom: 15px;
}

.v-text-field {
  width: 80%;
}

@media (width < 762px) {
  .modal-content {
    width: 90%;
  }
}
</style>
