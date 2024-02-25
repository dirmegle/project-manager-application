<script setup lang="ts">
    const emit = defineEmits(['buttonClicked'])

    function handleEmit() {
        emit('buttonClicked')
    }
</script>

<template>
    <button @click="handleEmit" type="button">
        <span class="mdi mdi-pencil"></span>
    </button>
</template>

<style scoped>

button {
    height: 100%;
}

.mdi-pencil {
    font-size: 1.6rem;
    color: var(--tertiary-background-color);
    transition: 0.3s ease-in-out;
    height: 100%;
}

.mdi-pencil:hover {
    color: var(--text-color)
}
</style>