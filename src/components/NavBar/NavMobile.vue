<script setup lang="ts">
import { ref } from 'vue';
import NavLinks from '@/components/NavBar/NavLinks.vue';

const drawer = ref(false);
</script>

<template>
  <v-layout>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

    <v-navigation-drawer h-auto class="drawer" v-model="drawer" location="top" temporary>
      <NavLinks />
    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped>
.v-layout {
  flex: none;
}

.v-navigation-drawer {
  padding: 20px;
  background-color: var(--primary-background-color);
}

.v-app-bar-nav-icon:hover {
  border-radius: 7px;
}
</style>
