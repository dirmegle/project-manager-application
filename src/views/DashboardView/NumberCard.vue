<script setup lang="ts">
const props = defineProps({
  data: { type: String, required: true }
});
</script>

<template>
  <div class="container container-data">
    <div data-testid="display-number" class="data container">{{ props.data }}</div>
    <h3 class="heading-small"><slot></slot></h3>
  </div>
</template>

<style scoped>
.container-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(10 37 64 / 35%) 0 -2px 6px 0 inset;
  padding: 40px 30px;
  background-color: var(--primary-accent-color);
}

.data {
  background-color: var(--primary-background-color);
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid var(--primary-accent-color);
}

.heading-small {
  text-align: center;
  color: var(--primary-background-color);
  font-size: 1.2rem;
  font-weight: 500;
}

@media (1200px > width >= 992px) {
  .data {
    font-size: 2rem;
  }
}

@media (width < 992px) {
  .container-data {
    flex-direction: column;
    padding: 0;
    padding: 10px;
    justify-content: start;
    column-gap: 15px;
  }

  .data {
    margin-bottom: 0;
    font-size: 1.8rem;
  }
}
</style>
