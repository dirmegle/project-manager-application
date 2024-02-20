<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import AlertMessage from '@/components/AlertMessage.vue'
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore'
import { ref, computed } from 'vue';

const clientManager = useClientManagerStore()
const name = ref('')
const description = ref('')
const logo = ref('')
const notes = ref('')
const showSuccessAlert = ref(false)
const showErrorAlert = ref(false)

const isNameProvided = computed(() => name.value.length > 0)

function isNameExisting(nameToCheck: string) {
    return clientManager.arrayOfClientNames.includes(nameToCheck)
}

function handleClientAddition() {
    if (!isNameExisting(name.value)) {
        clientManager.addNewClient(name.value, description.value, logo.value, notes.value)
        name.value = '';
        description.value = '';
        logo.value = '';
        notes.value = '';
        showSuccessAlert.value = true
        setTimeout(() => {
            showSuccessAlert.value = false
        }, 7000)
    } else {
        showErrorAlert.value = true;
        setTimeout(() => {
            showErrorAlert.value = false;
        }, 7000)
    }
}
</script>

<template>
    <div class="container-smaller-text-fields">
        <v-text-field v-model="name" label="Client name*" variant="underlined"></v-text-field>
        <v-text-field v-model="description" label="Client description" variant="underlined"></v-text-field>
        <v-text-field v-model="logo" label="Logo URL" variant="underlined"></v-text-field>
    </div>
    <v-textarea v-model="notes" rows="3" label="Notes" variant="underlined"></v-textarea>

    <AlertMessage v-if="showSuccessAlert" color="green-lighten-1" icon="$success" title="Success">Client has been added and now appears in the list in the "CHOOSE CLIENT" tab.</AlertMessage>
    <AlertMessage v-if="showErrorAlert" color="red-lighten-1" icon="$error" title="Error">Client with this name already exists.</AlertMessage>

    <BaseButton buttonStyle="filled" :disabled="!isNameProvided" @buttonClicked="handleClientAddition">Create new client</BaseButton>
</template>

<style>
    .v-text-field {
        color: var(--text-color);
        font-family: var(--primary-font);
    }

    .v-textarea {
        color: var(--text-color);
        font-family: var(--primary-font);
    }

    .container-smaller-text-fields {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
    }

    @media (width < 768px) {
    .container-smaller-text-fields {
        grid-template-columns: 1fr;
    }
}
</style>