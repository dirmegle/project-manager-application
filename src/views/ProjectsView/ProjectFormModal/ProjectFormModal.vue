<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import useProjectManagerStore from '@/stores/projectManagerStore/projectManagerStore';
import BaseButton from '@/components/BaseButton.vue'
import CloseIconButton from '../../../components/CloseIconButton.vue';
import FormProjectInfo from './FormProjectInfo.vue'
import FormCreateClient from '../../../components/FormCreateClient.vue'
import ClientInputSelect from './ClientInputSelect.vue'

const clientManager = useClientManagerStore()
const projectManager = useProjectManagerStore()

const tab = ref(null)

const clientID: Ref<string> = ref('')
const projectName = ref('')
const projectDescription = ref('')

const emit = defineEmits(['close', 'projectCreated'])

const props = defineProps({
    visible: { type: Boolean, required: true }
});

const areAllRequiredInputsProvided = computed(() => {
    return projectName.value.length > 0 && clientID.value.length > 0
})

function handleClose() {
    emit('close')
}

function updateClientID(newName: string) {
    clientID.value = clientManager.getClientIDByName(newName)
}

function updateProjectName(newName: string) {
    projectName.value = newName
}

function updateProjectDescription(newDescription: string) {
    projectDescription.value = newDescription
}

function handleProjectAddition() {
    projectManager.addNewProject(projectName.value, projectDescription.value, clientID.value)
    emit('projectCreated')
    handleClose()
}

</script>

<template>
    <div v-if="props.visible" class="modal-overlay">
        <div class="modal-content container">
        <div class="modal-content-wrapper">
            <div class="modal-content-top">
                <h1 class="heading-large">Create project</h1>
                <CloseIconButton @close="handleClose"/>
            </div>
            <v-divider class="divider"></v-divider>
        <!-- Tabs for client -->
            <v-tabs v-model="tab" class="tabs" color="#8F8FF4" align-tabs="start">
                <v-tab value="one">Choose client</v-tab>
                <v-tab value="two">Create client</v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <!-- Select existing client tab -->
                <v-window-item value="one">
                    <ClientInputSelect @clientSelected="updateClientID"/>
                </v-window-item>

                <!-- Create new client tab -->
                <v-window-item value="two">
                    <FormCreateClient/>
                </v-window-item>
            </v-window>
            <v-divider class="divider"></v-divider>
            <h2 class="heading-medium">Project information:</h2>

            <FormProjectInfo @projectNameChanged="updateProjectName" @projectDescriptionChanged="updateProjectDescription"/>

            <div class="button-wrapper">
                <BaseButton class="first-button" buttonStyle="empty" :disabled="!areAllRequiredInputsProvided" @buttonClicked="handleProjectAddition">Save</BaseButton>
                <BaseButton buttonStyle="empty" :disabled="false" @buttonClicked="handleClose">Cancel</BaseButton>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    inset: 0;
    background-color: #1d212f7f;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    z-index: 2;
    background-color: #FBFBFB;
    display: flex;
    justify-content: center;
}

.modal-content-wrapper {
        width: 95%;
}

.modal-content-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.tabs .v-tab {
    color: var(--text-color);
    font-family: var(--primary-font);
    font-size: 0.8rem;
}

.input-select {
    color: var(--text-color);
    font-family: var(--primary-font);
}

.button-wrapper {
    display: flex;
    flex-direction: row;
}

.first-button {
    border-right: 1px solid var(--primary-accent-color);
}

@media (width >= 992px) {
    .modal-content {
        width: 900px;
    }
}

@media (992px > width >= 768px) {
    .modal-content {
        width: 720px;
    }
}

@media (width < 768px) {
    .modal-content {
        width: 90%;
    }
}
</style>