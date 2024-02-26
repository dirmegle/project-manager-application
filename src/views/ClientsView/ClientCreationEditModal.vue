<script setup lang="ts">
import CloseIconButton from '@/components/CloseIconButton.vue'
import FormCreateClient from '@/components/FormCreateClient.vue';

const props = defineProps({
    visible: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])

function handleClose() {
    emit('close')
}

</script>

<template>
    <div v-if="props.visible" class="modal-overlay">
        <div class="modal-content container">
            <div class="modal-content-wrapper">
                <div class="modal-content-top">
                    <h1 class="heading-large">Create client</h1>
                    <CloseIconButton @close="handleClose"/>
                </div>
                <v-divider class="divider"></v-divider>
                <FormCreateClient @close="handleClose"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-content {
        width: 50%;
    }
</style>