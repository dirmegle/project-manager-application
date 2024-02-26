
<script setup lang="ts">
import DatePicker from '@/components/DatePicker.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import { computed, ref } from 'vue';
import useProjectManagerStore, { type Project } from '@/stores/projectManagerStore/projectManagerStore';

const projectManager = useProjectManagerStore()

const currentDate = computed(() => new Date().toISOString().slice(0, 10));

const thirtyDaysAgoDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().slice(0, 10);
});

const fromDate = ref(currentDate)
const toDate = ref(thirtyDaysAgoDate)

const actualIncomeForDates = computed(() => {
    const completedProjects =  projectManager.getFilteredProjectsByCompletionDate(fromDate.value, toDate.value)
    let income = 0
    completedProjects.forEach((project: Project) => {
        income += project.totalOfCompletedProject
    })
    return income
})

const showIncorrectDatesAlert = ref(false)


function updateFromDate(newDate:string) {
    fromDate.value = newDate
    areSelectedDatesValid()
}

function updateToDate(newDate:string) {
    toDate.value = newDate
    areSelectedDatesValid()
}

function areSelectedDatesValid() {
    const from = fromDate.value ? new Date(fromDate.value) : null;
    const to = toDate.value ? new Date(toDate.value) : null;
    showIncorrectDatesAlert.value = (from && to) ? from > to : false;
}

</script>

<template>
    <div class="container-actual-income">
        <div class="container-date-pickers">
            <DatePicker toDate="toDate" label="From:" @updateDate="updateFromDate"/>
            <DatePicker label="To:" @updateDate="updateToDate"/>
        </div>

        <p>{{ actualIncomeForDates }}</p>
    </div>
    <AlertMessage v-if="showIncorrectDatesAlert" color="amber" icon="$warning" title="'From' date is bigger than 'To' date" >Please select correct dates</AlertMessage>
</template>

<style scoped>
.container-date-pickers {
    display: flex;
    flex-direction: row;
}
</style>