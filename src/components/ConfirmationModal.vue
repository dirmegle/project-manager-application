<script setup lang="ts">

import BaseButton from '@/components/BaseButton.vue';

const props = defineProps({
    title: {type: String, required: true},
})

const emit = defineEmits(['confirm', 'cancel'])

function handleCancel() {
    emit('cancel')
}

function handleConfirmation() {
    emit('confirm')
}

</script>

<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h1 class="heading-large">{{ props.title }}</h1>
            <v-divider class="divider"></v-divider>
            <p><slot></slot></p>
            <div class="button-wrapper">
                <BaseButton class="first-button" buttonStyle="empty" :disabled="false" @buttonClicked="handleConfirmation">Confirm</BaseButton>
                <BaseButton buttonStyle="empty" :disabled="false" @buttonClicked="handleCancel">Cancel</BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped>

.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    box-shadow: rgb(99 99 99 / 20%) 0 2px 8px 0;
    padding: 10px 15px;
    width: 400px;
}

.modal-content p {
    width: 90%;
    text-align: center;
    margin-bottom: 15px;
}

@media (width < 762px) {
        .modal-content {
            width: 90%;
        }
    }
</style>