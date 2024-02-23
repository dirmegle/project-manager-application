<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useProjectManagerStore from '@/stores/projectManagerStore/projectManagerStore';
import EditIconButton from '@/components/EditIconButton.vue'
import CloseIconButton from '@/components/CloseIconButton.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import ClientDisplayCard from '@/components/ClientDisplayCard.vue'
import { ref } from 'vue';
import LineItemsTable from './LineItemsTable.vue'
import useProjectLineRecorderStore from '../../stores/projectLineRecorderStore/projectLineRecorderStore';

const route = useRoute();
const router = useRouter()
const projectID = route.params.id as string
const projectManager = useProjectManagerStore()
const clientManager = useClientManagerStore()
const lineRecorder = useProjectLineRecorderStore()

const isConfirmationModalVisible = ref(false)

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

function toggleProjectStatus() {
    
}

// function markProjectAsCompleted() {
//     console.log('yes')
// }

// With project mark as completed, check if there are any line items. If not, need to mention that in confirmation message

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
        <h2 class="heading-medium">Current project value</h2>
        <div class="total-value-container container">€{{ lineRecorder.getTotalValueForProject(projectID).toFixed(2) }}</div>

        <h2 class="heading-medium">Line items</h2>
        <p class="line-item-explanation">All fields must be filled. Whenever you want to remove a line item, click 'X'.</p>
        <LineItemsTable :projectID="projectID"/>
        <div class="button-container">
            <BaseButton @buttonClicked="isConfirmationModalVisible = true" buttonStyle="filled-green" :disabled="false" v-if="!projectManager.getProjectByID(projectID).completed">Mark project as completed</BaseButton>
            <BaseButton @buttonClicked="isConfirmationModalVisible = true" buttonStyle="filled-green" :disabled="false" v-if="projectManager.getProjectByID(projectID).completed">Mark project as ongoing</BaseButton>
            <BaseButton @buttonClicked="handleClose" buttonStyle="filled" :disabled="false">Close</BaseButton>
        </div>
        <ConfirmationModal v-if="isConfirmationModalVisible" title="Please confirm" @cancel="isConfirmationModalVisible = false" @confirm="toggleProjectStatus">
            <span v-if="!projectManager.getProjectByID(projectID).completed">
                Current value of the project you'd like to complete is €{{ lineRecorder.getTotalValueForProject(projectID).toFixed(2) }}. The amount will be added to your total income. Would you like to proceed?
            </span>
            <span v-if="projectManager.getProjectByID(projectID).completed">
                Are you sure you'd like to mark the project as ongoing? It's value of €{{ lineRecorder.getTotalValueForProject(projectID).toFixed(2) }} will be removed from your total income.
            </span>
        </ConfirmationModal>
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
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
}

.line-item-explanation {
    margin-bottom: 10px;
}

.total-value-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    background-color: var(--secondary-background-color);
    border: 1px solid var(--secondary-accent-color);
    color: var(--text-color);
    font-weight: 700;
}

@media (width < 768px) {
    .button-container  {
        flex-direction: column;
    }
}
</style>
