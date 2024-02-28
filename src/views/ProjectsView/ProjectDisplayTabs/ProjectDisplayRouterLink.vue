<script setup lang="ts">
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';

const clientManager = useClientManagerStore();

const props = defineProps({
  project: { type: Object, required: true }
});

const { projectName, clientID, projectID } = props.project;

const clientName = clientManager.getClientNameByID(clientID);
</script>

<template>
  <div data-testid="project-item" class="container-router-link container">
    <RouterLink class="router-link" :to="`/projects/${projectID}`">
      <div class="text-wrapper">
        <h2 class="heading-medium project-name">{{ projectName }}</h2>
        <p class="company-name heading-small">{{ clientName }}</p>
      </div>
      <span class="mdi mdi-chevron-right"></span>
    </RouterLink>
  </div>
</template>

<style scoped>
.container-router-link {
  margin: 10px 0;
  background-color: var(--secondary-background-color);
  width: 99%;
  transition: 0.3s ease-in-out;
}

.container-router-link:hover {
  background-color: var(--tertiary-background-color);
}

.project-name,
.company-name {
  color: var(--text-color);
}

.router-link {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.mdi-chevron-right {
  color: var(--text-color);
  font-size: 30px;
}

.heading-small {
  width: 100%;
}
</style>
