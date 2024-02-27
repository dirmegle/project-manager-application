<script setup lang="ts">
import { ref, computed } from 'vue';
import noProjects from '@/assets/images/noProjects.png'
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
    <v-tabs grow v-model="tab" class="tabs" color="indigo-accent-1" align-tabs="center">
        <v-tab value="one">Ongoing</v-tab>
        <v-tab value="two">Completed</v-tab>
    </v-tabs>

    <v-window v-model="tab">
        <v-window-item transition="v-tab-transition" value="one">

            <div class="container-no-content" v-if="ongoingProjects.length === 0">
                <div class="container-image">
                    <img :src="noProjects" alt="No-content">
                </div>
                <p class="no-content-message">You currently have no ongoing projects. <br>
                Create some!</p>
            </div>
            <div class="project-wrapper">
              <ProjectDisplayRouterLink v-for="project in ongoingProjects" :key="project.projectID" :project="project"/>
            </div>
        </v-window-item>
    </v-window>

    <v-window v-model="tab">
        <v-window-item transition="v-tab-transition" value="two">
            <div class="container-no-content" v-if="completedProjects.length === 0">
                <div class="container-image">
                    <img :src="noProjects" alt="No-content">
                </div>
                <p class="no-content-message">You currently have no completed projects. <br>
                Better get to work!</p>
            </div>
            <div class="project-wrapper">
              <ProjectDisplayRouterLink v-for="project in completedProjects" :key="project.projectID" :project="project"/>
            </div>
        </v-window-item>
    </v-window>
</template>

<style scoped>
    .v-slide-group {
        flex: none
    }

    .project-wrapper {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>