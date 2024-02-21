<script>
import BaseButton from '@/components/BaseButton.vue'

function handleItemAddition() {
    console.log('handling...')
}

</script>

<template>
    <div class="table-desktop-tablet">

        <table>
        <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
        </tr>
        <!-- Input fields -->
        <tr>
            <td><v-text-field label="Name" variant="underlined"></v-text-field></td>
            <td><v-text-field label="Unit" variant="underlined"></v-text-field></td>
            <td><v-text-field label="Quantity" variant="underlined"></v-text-field></td>
            <td><v-text-field label="Price" variant="underlined"></v-text-field></td>
            <td><v-text-field label="Total" variant="underlined"></v-text-field></td>
            <td><BaseButton buttonStyle="filled" :disabled="!isNameProvided" @buttonClicked="handleItemAddition">Add</BaseButton></td>
        </tr>
        </table>
    </div>
</template>

<style scoped>
.table-desktop-tablet th {
    text-align: left;
}

.table-desktop-tablet table {
    width: 100%;
}
</style>