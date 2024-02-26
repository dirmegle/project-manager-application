<script setup lang="ts">
import useClientManagerStore from '@/stores/clientManagerStore/clientManagerStore';
import { ref, watch } from 'vue';

const clientManager = useClientManagerStore()

const selectedClientName = ref(null)

const emit = defineEmits(['clientSelected'])

watch(selectedClientName, (newName) => {
    emit('clientSelected', newName);
});

</script>

<template>
    <v-select
    label="Client*"
    :items="clientManager.arrayOfActiveClientNames"
    v-model="selectedClientName"
    variant="underlined"
    class="input-select"
    ></v-select>
</template>