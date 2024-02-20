<script setup lang="ts">
import { ref } from 'vue';

const tab = ref(null)
</script>

<template>
    <v-tabs v-model="tab" class="tabs" color="indigo-accent-1" align-tabs="center">
        <v-tab value="one">Ongoing projects</v-tab>
        <v-tab value="two">Completed projects</v-tab>
    </v-tabs>

    <v-window v-model="tab">
        <!-- Select existing client tab -->
        <v-window-item value="one">
            
        </v-window-item>
    </v-window>

    <v-window v-model="tab">
        <!-- Select existing client tab -->
        <v-window-item value="two">
            <h1>Hey</h1>
        </v-window-item>
    </v-window>
</template>