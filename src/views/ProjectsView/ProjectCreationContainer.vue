<script setup lang="ts">
    import  BaseButton  from '@/components/BaseButton.vue'
    import AlertMessage from '@/components/AlertMessage.vue'
    import createProject from '@/assets/images/createProject.png'
    import { ref } from 'vue';
    import ProjectFormModal from './ProjectFormModal/ProjectFormModal.vue'
  
    const isProjectCreationModalVisible = ref(false)
    const isSuccessAlertVisible = ref(false)

    function toggleProjectCreationModal() {
    isProjectCreationModalVisible.value = !isProjectCreationModalVisible.value;
    }

    function handleSuccessAlert() {
      isSuccessAlertVisible.value = true

      setTimeout(() => {
        isSuccessAlertVisible.value = false
        }, 7000)
    }
</script>

<template>
    <div class="container-item-creation container">
      <div class="subcontainer-text-button">
        <h1 class="heading-large">Add a new project</h1>
        <p>Choose a client, add the details and track your work.</p>
        <BaseButton @buttonClicked="toggleProjectCreationModal" buttonStyle="filled" :disabled="false">Add new</BaseButton>
      </div>
      <div class="subcontainer-image">
        <img :src="createProject" alt="create-project-illustration">
      </div>
    </div>
    <AlertMessage v-if="isSuccessAlertVisible" color="green-lighten-1" icon="$success" title="New project added successfully">You can now add more details to each of your projects below.</AlertMessage>
    <ProjectFormModal :visible="isProjectCreationModalVisible" @close="toggleProjectCreationModal" @projectCreated="handleSuccessAlert"/>
</template>