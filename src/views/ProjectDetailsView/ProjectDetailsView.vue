<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useProjectManagerStore from '@/stores/projectManagerStore/projectManagerStore';
import EditIconButton from '@/components/EditModal/EditIconButton.vue'
import CloseIconButton from '@/components/CloseIconButton.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import ClientDisplayCard from '@/components/ClientDisplayCard.vue'
import { computed, ref } from 'vue';
import EditModal from '@/components/EditModal/EditModal.vue'
import LineItemsTable from './LineItemsTable.vue'
import useProjectLineRecorderStore from '../../stores/projectLineRecorderStore/projectLineRecorderStore';

const route = useRoute()
const router = useRouter()

const projectID = route.params.id as string
const projectManager = useProjectManagerStore()

const clientManager = useClientManagerStore()
const lineRecorder = useProjectLineRecorderStore()

const isStatusConfirmationModalVisible = ref(false)
const statusConfirmationMessage = ref('')

const isEditModalVisible = ref(false)

const isDeletionConfirmationModalVisible = ref(false)
const deletionConfirmationMessage = ref('')

const project = projectManager.getProjectByID(projectID)

const { projectName, clientID } = project

const currentProjectName = computed(() => {
  const currentProject = projectManager.getProjectByID(projectID);
  return currentProject ? currentProject.projectName : '';
});

const projectDescription = ref(project.projectDescription)

const client = clientManager.getClientByID(clientID)

const totalValueOfProject = lineRecorder.getTotalValueForProject(projectID)

function handleProjectNameEdit(newName: string) {
    projectManager.editProjectName(newName, projectID)
    isEditModalVisible.value = false
}

function handleClose() {
    router.back()
}

function updateProjectDescription() {
    projectManager.editProjectDescription(projectDescription.value, projectID)
}

function toggleProjectStatus() {
    projectManager.toggleProjectCompletionStatus(projectID, totalValueOfProject)
    lineRecorder.toggleCompletedStatus(projectID)
    isStatusConfirmationModalVisible.value = false
}

function showStatusConfirmationModal() {
    const message = projectManager.getProjectByID(projectID).completed
        ? `Are you sure you'd like to mark the project as ongoing? Its value of €${lineRecorder.getTotalValueForProject(projectID).toFixed(2)} will be removed from your actual income.`
        : `Current value of the project you'd like to complete is €${lineRecorder.getTotalValueForProject(projectID).toFixed(2)}. The amount will be added to your actual income. You will not be able to add any new line items. Would you like to proceed?`

    statusConfirmationMessage.value = message;
    isStatusConfirmationModalVisible.value = true;
}

function showDeletionConfirmationModal() {
    deletionConfirmationMessage.value = 'Are you sure you want to delete the project? All income data of this project will be removed.'
    isDeletionConfirmationModalVisible.value = true
}

function handleDeletionOfProject() {
    lineRecorder.removeProjectArrayFromObject(projectID)
    projectManager.createNewArrayWithoutProject(projectID)
    isDeletionConfirmationModalVisible.value = false
    handleClose()
}

</script>

<template>
    <div class="content-wrapper">
        <div class="container-top">
            <div class="container-headline">
               <h1 class="heading-large" data-testid="project-details-name">{{ currentProjectName }}</h1>
                <EditIconButton @buttonClicked="isEditModalVisible=true"/>
                <EditModal v-if="isEditModalVisible" :currentName="projectName" @cancel="isEditModalVisible = false" @confirm="handleProjectNameEdit"/>
            </div>
            <CloseIconButton @close="handleClose"/>
        </div>
        <v-divider class="divider"></v-divider>
        <div class="container-client container">
            <ClientDisplayCard :client="client"/>
        </div>
        <h2 class="heading-medium">Project description:</h2>
        <v-textarea data-testid="project-details-description" @change="updateProjectDescription" v-model="projectDescription" variant="underlined"></v-textarea>
        <h2 class="heading-medium">Current project value</h2>
        <div class="total-value-container container">€{{ totalValueOfProject.toFixed(2) }}</div>

        <h2 class="heading-medium">Line items</h2>
        <p class="line-item-explanation">All fields must be filled. Whenever you want to remove a line item, click 'X'.</p>
        <LineItemsTable :projectID="projectID"/>
        <div class="button-container">
            <BaseButton @buttonClicked="showStatusConfirmationModal" buttonStyle="filled-green" :disabled="false" v-if="!projectManager.getProjectByID(projectID).completed">Mark project as completed</BaseButton>
            <BaseButton @buttonClicked="showStatusConfirmationModal" buttonStyle="filled-green" :disabled="false" v-if="projectManager.getProjectByID(projectID).completed">Mark project as ongoing</BaseButton>
            <BaseButton @buttonClicked="showDeletionConfirmationModal" buttonStyle="filled-green" :disabled="false">Delete project</BaseButton>
            <BaseButton @buttonClicked="handleClose" buttonStyle="filled" :disabled="false">Close</BaseButton>
        </div>
        <ConfirmationModal v-if="isStatusConfirmationModalVisible" title="Please confirm" @cancel="isStatusConfirmationModalVisible = false" @confirm="toggleProjectStatus">
            <span>{{ statusConfirmationMessage }}</span>
        </ConfirmationModal>
        <ConfirmationModal v-if="isDeletionConfirmationModalVisible" title="Please confirm" @cancel="isDeletionConfirmationModalVisible = false" @confirm="handleDeletionOfProject">
            <span>{{ deletionConfirmationMessage }}</span>
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
