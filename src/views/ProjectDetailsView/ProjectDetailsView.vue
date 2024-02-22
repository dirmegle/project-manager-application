<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useProjectManagerStore from '@/stores/projectManagerStore/projectManagerStore';
import EditIconButton from '@/components/EditIconButton.vue'
import CloseIconButton from '@/components/CloseIconButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import ClientDisplayCard from '@/components/ClientDisplayCard.vue'
import { ref } from 'vue';
import LineItemsTable from './LineItemsTable.vue'

const route = useRoute();
const router = useRouter()
const projectID = route.params.id as string
const projectManager = useProjectManagerStore()
const clientManager = useClientManagerStore()

const project = projectManager.getProjectByID(projectID)

const { projectName, clientID } = project

const projectDescription = ref(project.projectDescription)

const client = clientManager.getClientByID(clientID)

function handleProjectNameEdit() {
    console.log('project name edit')
}

function handleClose() {
    router.back()
}

function updateProjectDescription() {
    projectManager.editProjectDescription(projectDescription.value, projectID)
}

function markProjectAsCompleted() {
    console.log('yes')
}

</script>

<template>
    <div class="content-wrapper">
        <div class="container-top">
            <div class="container-headline">
               <h1 class="heading-large">{{ projectName }}</h1>
                <EditIconButton @buttonClicked="handleProjectNameEdit"/> 
            </div>
            <CloseIconButton @close="handleClose"/>
        </div>
        <v-divider class="divider"></v-divider>
        <div class="container-client container">
            <ClientDisplayCard :client="client"/>
        </div>
        <h2 class="heading-medium">Project description:</h2>
        <v-textarea @change="updateProjectDescription" v-model="projectDescription" variant="underlined"></v-textarea>
        <h2 class="heading-medium">Line items</h2>
        <LineItemsTable :projectID="projectID"/>
        <div class="button-container">
            <BaseButton @buttonClicked="markProjectAsCompleted" buttonStyle="filled-green" :disabled="false">Mark project as completed</BaseButton>
            <BaseButton @buttonClicked="handleClose" buttonStyle="filled" :disabled="false">Close</BaseButton>
        </div>
    </div>
</template>

<style scoped>

.content-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.container-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.container-headline {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
}

.container-client {
    width: 100%;
    background-color: var(--secondary-background-color);
    margin-bottom: 20px;

}

.heading-medium {
    margin-bottom: 10px;
}

.button-container {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
}
</style>
