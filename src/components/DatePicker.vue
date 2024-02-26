<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps({
    label: {type: String, required: true},
    content: {type: String, default: () => ''}
})

const emit = defineEmits(['updateDate'])

const selectedDate = ref(props.content)
const currentDate = computed(() => new Date().toISOString().slice(0, 10));

watch(
  () => selectedDate.value,
  newDate => {
    emit('updateDate', newDate);
  }
);

</script>

<template>
    <div class="container-date-input">
        <label class="heading-small" for="date">{{ props.label }}</label>
        <input placeholder="Select date" :max="currentDate" id="date" type="date" v-model="selectedDate"/>
    </div>
</template>

<style scoped>
.container-date-input {
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    align-items: center
}

.heading-small {
    font-size: 1rem;
    font-weight: 700;
}
</style>

<!-- <script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    label: {type: String, required: true},
    content: {type: String, default: () => ''}
})

const showDatePicker = ref(false)

const selectedDate = ref(props.content)

</script>

<template>
      <v-menu
      v-model="showDatePicker"
      transition="scale-transition"
      max-width="290px"
    min-width="290px">
        <template v-slot:activator="{ on }">
      <v-text-field
        :value="props.content"
        :label="props.label"
        placeholder="YYYY-MM-DD"
        prepend-inner-icon="mdi-calendar-blank-outline"
        clearable
        v-on="on"
        v-model="selectedDate"
        readonly
      >
      </v-text-field>
    </template>
    <v-date-picker
      v-model="selectedDate"
      @input="showDatePicker = false"
      :max="new Date()"
    ></v-date-picker>
  </v-menu>
</template> -->