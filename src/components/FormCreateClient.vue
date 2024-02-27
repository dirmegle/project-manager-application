<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['close']);

const clientManager = useClientManagerStore();

const name = ref('');
const description = ref('');
const notes = ref('');
const logo = ref('');
const isLogoURLValid = ref(false);

const showURLIncorrectAlert = ref(false);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

const isNameProvided = computed(() => name.value.length > 0);

function isNameExisting(nameToCheck: string) {
  return clientManager.arrayOfActiveClientNames.includes(nameToCheck);
}

function isURLValid(stringToCheck: string) {
  // Regular expression for URL validation
  // Source: https://bhomaramjangid.medium.com/how-to-validate-url-using-regular-expression-in-javascript-db0afcd12efd
  const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;
  return urlRegex.test(stringToCheck);
}

function handleClientAddition() {
  if (!isNameExisting(name.value)) {
    clientManager.addNewClient(
      name.value,
      description.value,
      notes.value,
      logo.value,
      isLogoURLValid.value
    );
    name.value = '';
    description.value = '';
    logo.value = '';
    notes.value = '';
    showURLIncorrectAlert.value = false;
    showSuccessAlert.value = true;
    setTimeout(() => {
      showSuccessAlert.value = false;
      emit('close');
    }, 2000);
  } else {
    showErrorAlert.value = true;
    setTimeout(() => {
      showErrorAlert.value = false;
    }, 5000);
  }
}

watch(logo, newURL => {
  isLogoURLValid.value = isURLValid(newURL);
  if (!isLogoURLValid.value) {
    showURLIncorrectAlert.value = true;
  }
});
</script>

<template>
  <div class="container-smaller-text-fields">
    <v-text-field v-model="name" label="Client name*" variant="underlined"></v-text-field>
    <v-text-field
      v-model="description"
      label="Client description"
      variant="underlined"
    ></v-text-field>
    <v-text-field v-model="logo" label="Logo URL" variant="underlined"></v-text-field>
  </div>
  <AlertMessage
    v-if="showURLIncorrectAlert"
    color="red-lighten-1"
    icon="$error"
    title="Provided URL is incorrect"
  />
  <v-textarea v-model="notes" rows="3" label="Notes" variant="underlined"></v-textarea>

  <AlertMessage v-if="showSuccessAlert" color="green-lighten-1" icon="$success" title="Success"
    >Client has been added and can now be selected for projects.</AlertMessage
  >
  <AlertMessage v-if="showErrorAlert" color="red-lighten-1" icon="$error" title="Error"
    >Client with this name already exists.</AlertMessage
  >

  <BaseButton buttonStyle="filled" :disabled="!isNameProvided" @buttonClicked="handleClientAddition"
    >Save client</BaseButton
  >
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

.heading-small {
  width: 99%;
}

@media (width < 768px) {
  .container-smaller-text-fields {
    grid-template-columns: 1fr;
  }
}
</style>
