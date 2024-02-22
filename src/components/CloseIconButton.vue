<script setup lang="ts">
    const emit = defineEmits(['close'])

    function emitEvent() {
        emit('close')
    }
</script>

<template>
    <button type="button" @click="emitEvent"><span class="mdi mdi-close"></span></button>
</template>

<style scoped>
    button {
        height: 100%;
        color: var(--tertiary-background-color);
        transition: 0.3s ease-in-out;
    }

    button:hover {
        color: var(--text-color)
    }

    button span {
        font-size: 25px;
    }
</style>