<script setup lang="ts">
import ClientDisplayCard from '@/components/ClientDisplayCard.vue'
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import BaseButton from '@/components/BaseButton.vue'
import ClientCreationContainer from './ClientCreationContainer.vue'

const clientManager = useClientManagerStore()

const activeClients = clientManager.getActiveClients

</script>

<template>
  <main>
    <ClientCreationContainer/>

    <v-divider class="divider"></v-divider>

    <div class="container-client-list">
      <v-expansion-panels>

        <v-expansion-panel elevation="0" class="container" v-for="client in activeClients" :key="client.clientID">
          <v-expansion-panel-title>
            <ClientDisplayCard :client="client"/>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            {{ client.clientNotes}}
            <div class="button-wrapper">
                <BaseButton class="first-button" buttonStyle="empty" :disabled="false">Edit</BaseButton>
                <BaseButton buttonStyle="empty" :disabled="false">Delete</BaseButton>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

      </v-expansion-panels>
    </div>
  </main>
</template>

<style scoped>
.container-client-list {
  margin-top: 20px;
}

.container {
  border-radius: 7px;
  background-color: var(--secondary-background-color);
  box-shadow: rgb(99 99 99 / 20%) 0 2px 8px 0;
  box-shadow: none;
  padding: 0;
}

</style>
