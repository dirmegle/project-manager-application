<script setup lang="ts">
    import  BaseButton  from '@/components/BaseButton.vue'
    import AlertMessage from '@/components/AlertMessage.vue'
    import createClient from '@/assets/images/createClient.png'
    import { ref } from 'vue';

    const isClientCreationModalVisible = ref(false)
    const isSuccessAlertVisible = ref(false)

    function toggleClientCreationModal() {
    isClientCreationModalVisible.value = !isClientCreationModalVisible.value;
    }

    // function handleSuccessAlert() {
    //   isSuccessAlertVisible.value = true

    //   setTimeout(() => {
    //     isSuccessAlertVisible.value = false
    //     }, 7000)
    // }
</script>

<template>
    <div class="container-item-creation container">
      <div class="subcontainer-text-button">
        <h1 class="heading-large">Add a new client</h1>
        <p>Create profiles for individuals and businesses you work with.</p>
        <BaseButton @buttonClicked="toggleClientCreationModal" buttonStyle="filled" :disabled="false">Add new</BaseButton>
      </div>
      <div class="subcontainer-image">
        <img :src="createClient" alt="create-client-illustration">
      </div>
    </div>
    <AlertMessage v-if="isSuccessAlertVisible" color="green-lighten-1" icon="$success" title="New project added successfully">You can now add more details to each of your projects below.</AlertMessage>
    <!-- Vieta modalui -->
</template>