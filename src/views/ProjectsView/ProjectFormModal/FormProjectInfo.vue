<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['projectNameChanged', 'projectDescriptionChanged']);

const projectName = ref('');
const projectDescription = ref('');

watch(projectName, newName => {
  emit('projectNameChanged', newName);
});

watch(projectDescription, newDescription => {
  emit('projectDescriptionChanged', newDescription);
});
</script>

<template>
  <v-text-field v-model="projectName" label="Project name*" variant="underlined"></v-text-field>
  <v-textarea
    v-model="projectDescription"
    label="Project description"
    variant="underlined"
  ></v-textarea>
</template>
