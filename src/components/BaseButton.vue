<script setup lang="ts">

const props = defineProps({
    buttonStyle: { type: String, required: true},
    disabled: {type: Boolean, required: false}
})

const emit = defineEmits(['buttonClicked'])

const handleClick = () => {
    emit('buttonClicked')
}

</script>

<template>
    <button class="button" :disabled="props.disabled" :class="props.buttonStyle" type="button" @click="handleClick"><slot></slot></button>
</template>

<style scoped>
    .filled {
        background-color: var(--primary-accent-color);
        color: #FBFBFB;
        box-shadow: rgb(99 99 99 / 20%) 0 2px 8px 0;
        border-radius: 7px;
        font-weight: 700;
    }

    .filled-green {
        background-color: var(--secondary-accent-color);
        color: #FBFBFB;
        box-shadow: rgb(99 99 99 / 20%) 0 2px 8px 0;
        border-radius: 7px;
        font-weight: 700;
    }

    .filled-green:hover {
        background-color: #5ba75f;
    }

    .filled:hover {
        background-color: #7171d4;
    }

    .empty:hover {
        font-weight: 700;
    }

    .button {
        padding: 5px 15px;
        text-transform: uppercase;
        font-size: 0.9rem;
        width: 100%;
        margin-bottom: 10px;
        transition: 0.3s ease-in-out;
    }
</style>