<script setup lang="ts">
import { ref, computed } from 'vue';
import useProjectManagerStore from '@/stores/projectManagerStore/projectManagerStore';
import ProjectDisplayRouterLink from './ProjectDisplayRouterLink.vue'

const projectManager = useProjectManagerStore()

const tab = ref('two')

const ongoingProjects = computed(() => {
   return projectManager.getFilteredProjectsByNotComplete().reverse()
})

const completedProjects = computed(() => {
    return projectManager.getFilteredProjectsByComplete().reverse()
})

</script>

<template>
    <v-tabs v-model="tab" class="tabs" color="indigo-accent-1" align-tabs="center">
        <v-tab value="one">Ongoing projects</v-tab>
        <v-tab value="two">Completed projects</v-tab>
    </v-tabs>

    <v-window v-model="tab">
        <v-window-item value="one">
            <div class="project-wrapper">
              <ProjectDisplayRouterLink v-for="project in ongoingProjects" :key="project.projectID" :project="project"/>
            </div>
        </v-window-item>
    </v-window>

    <v-window v-model="tab">
        <v-window-item value="two">
            <div class="project-wrapper">
              <ProjectDisplayRouterLink v-for="project in completedProjects" :key="project.projectID" :project="project"/>
            </div>
        </v-window-item>
    </v-window>
</template>

<style scoped>
    .project-wrapper {
        margin: 20px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>