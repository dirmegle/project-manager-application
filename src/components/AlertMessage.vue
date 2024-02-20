import AlertMessage from '@/components/AlertMessage.vue';
<script setup lang="ts">

const props = defineProps({
    color: {type: String, required: true},
    icon: {type: String, required: true},
    title: {type: String, required: true}
})
</script>

<template>
    <v-alert
    class="alert-message"
    transition="v-fade-transition"
    closable
    :color="props.color"
    :icon="props.icon"
    :title="props.title"
    >
    <slot></slot>
    </v-alert>
</template>

<style scoped>
    .alert-message {
        margin: 10px 0;
    }
</style>