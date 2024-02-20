<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- Set up logic for the desktop and mobile navigation -->
  <!-- Set up theme toggler in this app view -->
  <header>
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/clients">Clients</RouterLink>
      </nav>
  </header>
  <RouterView />
</template>
