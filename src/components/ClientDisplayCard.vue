<script setup>
import { ref } from 'vue'
import defaultLogo from '@/assets/images/defaultLogo.png'

const props = defineProps({
    client: {type: Object, required: true}
})

// const logoPath = ref('')

const { clientName, clientDescription, isLogoURLValid, clientLogo } = props.client

const logoPath = ref(isLogoURLValid ? clientLogo : defaultLogo)

function handleImageError() {
    logoPath.value = defaultLogo
}

</script>

<template>
    <div class="container-client-main-info">
        <div class="client-logo container">
            <img :src="logoPath" alt="client-logo" @error="handleImageError">
        </div>
        <div class="client-info">
            <h2 class="heading-medium">{{ clientName }}</h2>
            <p>{{ clientDescription }}</p>
        </div>
    </div>
</template>

<style scoped>

    .container-client-main-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
        margin: 10px 0;
    }

    .client-logo {
        height: 100px;
        width: 100px;
        background-color: var(--primary-background-color);
    }

    .client-logo img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
</style>