<script setup lang="ts">
import  { RouterLink } from 'vue-router'
</script>

<template>
    <div class="container-links">
        <RouterLink to="/" class="heading-small"><span class="mdi mdi-view-dashboard"></span> Dashboard</RouterLink>
        <RouterLink to="/projects" class="heading-small"><span class="mdi mdi-rocket-launch"></span> Projects</RouterLink>
        <RouterLink to="/clients" class="heading-small"><span class="mdi mdi-account-multiple"></span> Clients</RouterLink>
    </div>
</template>

<style scoped>
.container-links {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    width: 100%;
}

.container-links .heading-small {
    font-size: 1.1rem;
    text-decoration: none;
    color: var(--text-color);
    width: 100%;
    transition: 0.3s ease-in-out;
    padding: 5px;
}

.container-links .heading-small:hover {
    background-color: var(--secondary-background-color);
    border-radius: 7px;
}

.container-links .heading-small:active {
    background-color: var(--secondary-background-color);
    border-radius: 7px;
    border: 1px solid var(--primary-accent-color)
}
</style>