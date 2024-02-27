<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import createClient from '@/assets/images/createClient.png';
import ClientCreationEditModal from './ClientCreationEditModal.vue';

const isClientCreationModalVisible = ref(false);

function toggleClientCreationModal() {
  isClientCreationModalVisible.value = !isClientCreationModalVisible.value;
}
</script>

<template>
  <div class="container-item-creation container">
    <div class="subcontainer-text-button">
      <h1 class="heading-large">Add a new client</h1>
      <p>Create profiles for individuals and businesses you work with.</p>
      <BaseButton @buttonClicked="toggleClientCreationModal" buttonStyle="filled" :disabled="false"
        >Add new</BaseButton
      >
    </div>
    <div class="subcontainer-image">
      <img :src="createClient" alt="create-client-illustration" />
    </div>
  </div>
  <ClientCreationEditModal
    :visible="isClientCreationModalVisible"
    @close="isClientCreationModalVisible = false"
  />
</template>
