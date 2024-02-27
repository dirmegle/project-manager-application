<script setup lang="ts">
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import { computed, ref } from 'vue';
import ClientDisplayCard from '@/components/ClientDisplayCard.vue'
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import BaseButton from '@/components/BaseButton.vue'
import defaultLogo from '@/assets/images/defaultLogo.png'
import ClientCreationContainer from './ClientCreationContainer.vue'

const clientManager = useClientManagerStore()

const targetClientID = ref('')

const activeClients = computed(() => {
  return clientManager.getActiveClients
})

const isDeletionModalVisible = ref(false)

function showDeletionModal(clientID: string) {
  targetClientID.value = clientID
  isDeletionModalVisible.value = true
}

function handleClientDeletion() {
  clientManager.toggleClientActivityStatus(targetClientID.value)
  isDeletionModalVisible.value = false
  targetClientID.value = ''
}

</script>

<template>
  <main>
    <ClientCreationContainer/>

    <v-divider class="divider"></v-divider>

    <div class="container-no-content" v-if="activeClients.length === 0">
        <div class="container-image">
            <img :src="defaultLogo" alt="No-content">
        </div>
        <p class="no-content-message">You currently have no clients. <br>
        Add some!</p>
      </div>
    <div class="container-client-list">
    
      <v-expansion-panels>

        <v-expansion-panel elevation="0" class="container" v-for="client in activeClients" :key="client.clientID">
          <v-expansion-panel-title>
            <ClientDisplayCard :client="client"/>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <h3 class="heading-medium">Client notes:</h3>
            <v-divider class="divider"></v-divider>
            <p class="client-notes">{{ client.clientNotes}}</p>
            <div class="button-wrapper">
                <BaseButton buttonStyle="filled" :disabled="false" @buttonClicked="showDeletionModal(client.clientID)" >Delete client</BaseButton>
            </div>
          </v-expansion-panel-text>
          <ConfirmationModal v-if="isDeletionModalVisible" title="Are you sure?" @cancel="isDeletionModalVisible=false" @confirm="handleClientDeletion">You will no longer be able to select this client for new projects. If the client has any ongoing projects, they will remain until completed. </ConfirmationModal>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </main>
</template>

<style scoped>
.container-client-list {
  margin-top: 20px;
  padding: 1px;
}

.container {
  border-radius: 7px;
  background-color: var(--secondary-background-color);
  box-shadow: rgb(99 99 99 / 20%) 0 2px 8px 0;
  box-shadow: none;
  padding: 0;
}

.heading-medium {
  margin-bottom: 15px;
}

.client-notes {
  margin-bottom: 15px;
}

</style>
