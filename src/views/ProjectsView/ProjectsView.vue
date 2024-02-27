<!-- Add filtering by client? Can get confusing with lots of projects -->
<script setup lang="ts">
import ProjectCreationContainer from './ProjectCreationContainer.vue';
import ProjectDisplayTabs from './ProjectDisplayTabs/ProjectDisplayTabs.vue'

</script>

<template>
  <main>
    <ProjectCreationContainer/>
    <ProjectDisplayTabs class="tabs"/>
  </main>
</template>

<style scoped>
.tabs {
  width: 100%;
}
</style>