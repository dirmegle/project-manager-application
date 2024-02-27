
<script setup lang="ts">
import rocket from '@/assets/images/rocket.png'
import DatePicker from '@/components/DatePicker.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import { computed, ref, watch } from 'vue';
import useProjectManagerStore, { type Project } from '@/stores/projectManagerStore/projectManagerStore';

const projectManager = useProjectManagerStore()

const currentDate = computed(() => new Date().toISOString().slice(0, 10));

const thirtyDaysAgoDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().slice(0, 10);
});

const fromDate = ref(thirtyDaysAgoDate.value)
const toDate = ref(currentDate.value)

const fromIsLessThanTo = computed(() => {
    const from = new Date(fromDate.value)
    const to = new Date(toDate.value)
    return from <= to
})

const actualIncome = ref(getActualIncomeForDates())

function updateFromDate(newDate:string) {
    fromDate.value = newDate
}

function updateToDate(newDate:string) {
    toDate.value = newDate
}

watch(
  () => fromDate.value,
  newDate => {
    fromDate.value = newDate
    actualIncome.value = getActualIncomeForDates()
  }
);

watch(
  () => toDate.value,
  newDate => {
    toDate.value = newDate
    actualIncome.value = getActualIncomeForDates()
  }
);

function getActualIncomeForDates() {
    const completedProjects =  projectManager.getFilteredProjectsByCompletionDate(fromDate.value, toDate.value)
    let income = 0
    completedProjects.forEach((project: Project) => {
        income += project.totalOfCompletedProject
    })
    return income
}

</script>

<template>
    <div class="container-actual-income container">
        <div class="container-information">
            <div class="container-date-pickers">
                <DatePicker :content="fromDate" label="From:" @updateDate="updateFromDate"/>
                <DatePicker :content="toDate" label="To:" @updateDate="updateToDate"/>
            </div>
            <div class="data container">€{{ actualIncome.toFixed(2) }}</div>
        </div>
        <div class="container-image">
            <img :src="rocket" alt="income-illustration">
        </div>

    </div>
    <AlertMessage v-if="!fromIsLessThanTo" color="amber" icon="$warning" title="'From' date is bigger than 'To' date" >Please select correct dates</AlertMessage>
</template>

<style scoped>
.container-actual-income {
    background-color: var(--secondary-background-color);
    box-shadow: rgb(10 37 64 / 35%) 0 -2px 6px 0 inset;
    padding: 40px 30px;
    display: grid;
    grid-template-columns: 4fr 1fr;
    width: 100%;
}

.container-information {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
}

.container-date-pickers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}

.data {
    background-color: var(--primary-background-color);
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

.container-image {
    height: 200px;
    width: auto;
}

.container-image img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

@media (width < 624px) {
    .container-date-pickers {
        flex-direction: column;
        row-gap: 15px;
    }

    .container-actual-income {
        grid-template-columns: 1fr;
    }

    .container-image {
        display: none;
    }
}

</style>