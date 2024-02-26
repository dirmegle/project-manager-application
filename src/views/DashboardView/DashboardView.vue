<script setup lang="ts">
import { computed } from 'vue'
import wave from '@/assets/images/wave.png'
import useProjectManagerStore from '@/stores/projectManagerStore/projectManagerStore'
import ActualIncomeCard from './ActualIncomeCard.vue'
import NumberCard from './NumberCard.vue'
import useProjectLineRecorderStore from '../../stores/projectLineRecorderStore/projectLineRecorderStore';

const projectManager = useProjectManagerStore()
const lineRecorder = useProjectLineRecorderStore()

const numberOfOngoingProjects = computed(() => {
    return projectManager.getFilteredProjectsByNotComplete().length
})

const numberOfCompletedProjects = computed(() => {
    return projectManager.getFilteredProjectsByComplete().length
})

const plannedIncome = computed(() => {
  return lineRecorder.getTotalSumOfOngoingProjects()
})

</script>

<template>
  <main>
    <div class="hello-container">
      <div class="image container">
        <img :src="wave" alt="hello">
      </div>
      <h1 class="heading-big">Hey there!</h1>
    </div>
    <h2 class="heading-medium">You currently have:</h2>
    <div class="container-number-cards">
      <NumberCard :data="numberOfOngoingProjects.toString()">Completed projects</NumberCard>
      <NumberCard :data="numberOfCompletedProjects.toString()">Ongoing projects</NumberCard>
      <NumberCard :data="`€${plannedIncome.toFixed(2)}`">Planned income</NumberCard>
    </div>
    <h2 class="heading-medium">Your actual income:</h2>
    <ActualIncomeCard/>
  </main>
</template>

<style scoped>
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }

  .hello-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
    margin-bottom: 15px;
  }

  .hello-container .image {
    height: 70px;
    width: 70px;
    background-color: var(--secondary-background-color);
  }

  .hello-container .image img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .container-number-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 15px;
  }

  @media (width < 992px) {
    .container-number-cards {
      grid-template-columns: 1fr;
    }
  }
</style>
