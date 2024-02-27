<script setup lang="ts">
import { computed, ref } from 'vue';
import CloseIconButton from '@/components/CloseIconButton.vue';
import useProjectLineRecorderStore from '../../stores/projectLineRecorderStore/projectLineRecorderStore';
import useProjectManagerStore from '../../stores/projectManagerStore/projectManagerStore';

const lineRecorder = useProjectLineRecorderStore();
const projectManager = useProjectManagerStore();

const props = defineProps({
  projectID: { type: String, required: true }
});

const project = projectManager.getProjectByID(props.projectID);

const name = ref('');
const unit = ref('');
const quantity = ref('');
const price = ref('');

const total = computed(() => {
  const parsedQuantity = parseFloat(quantity.value);
  const parsedPrice = parseFloat(price.value);
  if (Number.isNaN(parsedQuantity) || Number.isNaN(parsedPrice)) {
    return '0.00';
  }
  return (parsedQuantity * parsedPrice).toFixed(2);
});

const areAllFieldsFilled = computed(() => {
  return (
    name.value.trim() &&
    unit.value.trim() &&
    quantity.value.toString().trim() &&
    price.value.toString().trim()
  );
});

function handleItemAddition() {
  const newItem = {
    itemName: name.value.trim(),
    unit: unit.value.trim(),
    quantity: parseFloat(quantity.value.trim()),
    price: parseFloat(price.value.trim()),
    total: parseFloat(total.value.trim())
  };

  lineRecorder.addNewRecordForProject(newItem, props.projectID);

  name.value = '';
  unit.value = '';
  quantity.value = '';
  price.value = '';
}

function deleteLineItem(itemID: string) {
  lineRecorder.createNewArrayWithoutLineItem(props.projectID, itemID);
}
</script>

<template>
  <div class="table desktop-tablet">
    <div class="grid-header">Name</div>
    <div class="grid-header">Unit</div>
    <div class="grid-header">Quantity</div>
    <div class="grid-header">Price</div>
    <div class="grid-header">Total</div>
    <div class="grid-header"></div>

    <div class="grid-row input-row" v-if="!project.completed">
      <div class="grid-item">
        <label
          ><input placeholder="Name" class="table-input container" type="text" v-model="name"
        /></label>
      </div>
      <div class="grid-item">
        <label
          ><input placeholder="Unit" class="table-input container" type="text" v-model="unit"
        /></label>
      </div>
      <div class="grid-item">
        <label
          ><input
            placeholder="Quantity"
            class="table-input container"
            type="text"
            v-model="quantity"
        /></label>
      </div>
      <div class="grid-item">
        <label
          ><input placeholder="Price" class="table-input container" type="text" v-model="price"
        /></label>
      </div>
      <div class="grid-item">
        <div class="container table-input">€{{ total }}</div>
      </div>
      <div class="grid-item">
        <button
          @click="handleItemAddition"
          class="container submit-button"
          type="button"
          :disabled="!areAllFieldsFilled"
        >
          <span class="mdi mdi-plus"></span>
        </button>
      </div>
    </div>

    <div
      class="grid-row"
      data-testid="project-item"
      v-for="lineItem in lineRecorder.getLineRecordForProject(props.projectID)"
      :key="lineItem.itemID"
    >
      <div class="grid-item data-display">{{ lineItem.itemName }}</div>
      <div class="grid-item data-display">{{ lineItem.unit }}</div>
      <div class="grid-item data-display">{{ lineItem.quantity }}</div>
      <div class="grid-item data-display">€{{ lineItem.price.toFixed(2) }}</div>
      <div class="grid-item data-display">€{{ lineItem.total.toFixed(2) }}</div>
      <div class="grid-item data-display delete-button">
        <CloseIconButton @close="deleteLineItem(lineItem.itemID)" />
      </div>
    </div>
  </div>

  <div class="mobile">
    <div class="input-block" v-if="!project.completed">
      <div>
        <label
          ><input placeholder="Name" class="table-input container" type="text" v-model="name"
        /></label>
      </div>
      <div class="detail-input-containers">
        <label
          ><input placeholder="Unit" class="table-input container" type="text" v-model="unit"
        /></label>
        <label
          ><input
            placeholder="Quantity"
            class="table-input container"
            type="text"
            v-model="quantity"
        /></label>
        <label
          ><input placeholder="Price" class="table-input container" type="text" v-model="price"
        /></label>
      </div>
      <div>
        <div class="container table-input total">€{{ total }}</div>
      </div>
      <div>
        <button
          @click="handleItemAddition"
          class="container submit-button"
          type="button"
          :disabled="!areAllFieldsFilled"
        >
          <span class="mdi mdi-plus"></span>
        </button>
      </div>
    </div>

    <div
      class="data-container container"
      v-for="lineItem in lineRecorder.getLineRecordForProject(props.projectID)"
      :key="lineItem.itemID"
    >
      <div class="top-row"><CloseIconButton @close="deleteLineItem(lineItem.itemID)" /></div>
      <div class="line-item-data-wrapper">
        <div class="line-item-data-text">
          <h2>{{ lineItem.itemName }}</h2>
          <v-divider class="divider"></v-divider>
          <div class="total container">€{{ lineItem.total.toFixed(2) }}</div>
          <div class="line-item-data-text-subcontainer">
            <div>
              <h3 class="heading-small">Unit:</h3>
              <p>{{ lineItem.unit }}</p>
            </div>
            <div>
              <h3 class="heading-small">Quantity:</h3>
              <p>{{ lineItem.quantity }}</p>
            </div>
            <div>
              <h3 class="heading-small">Price:</h3>
              <p>€{{ lineItem.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
  width: 100%;
}

.grid-row {
  display: contents;
}

.grid-header,
.grid-item {
  text-align: left;
}

.data-display {
  border-bottom: 1px solid var(--tertiary-background-color);
  display: flex;
  align-items: center;
}

.delete-button {
  justify-content: center;
}

.table-input {
  background-color: var(--secondary-background-color);
  padding-left: 5px;
  border: 0.5px solid var(--tertiary-background-color);
}

.submit-button {
  background-color: var(--primary-accent-color);
  height: 100%;
  transition: 0.3s ease-in-out;
}

.submit-button:hover {
  background-color: #7171d4;
}

.submit-button .mdi-plus {
  font-size: 1.1rem;
  color: var(--primary-background-color);
}

/* Mobile */
.mobile {
  display: none;
}

.detail-input-containers {
  display: flex;
  flex-direction: row;
  column-gap: 5px;
}

.input-block {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

.divider {
  margin-top: 10px;
}

.mobile .total {
  display: flex;
  justify-content: center;
}

.mobile .detail-input-containers {
  width: 100%;
}

.data-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-background-color);
  margin-top: 10px;
}

.data-container .top-row {
  display: flex;
  justify-content: flex-end;
}

.line-item-data-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 10px;
}

.line-item-data-wrapper .total {
  background-color: var(--primary-background-color);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.line-item-data-text {
  width: 100%;
}

.line-item-data-text-subcontainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.line-item-data-text-subcontainer > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
}

.line-item-data-text-subcontainer > div p {
  font-size: 0.8rem;
}

@media (width < 768px) {
  .desktop-tablet {
    display: none;
  }

  .mobile {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}

@media (width < 336px) {
  .line-item-data-text-subcontainer {
    flex-direction: column;
    justify-content: start;
  }
}
</style>
