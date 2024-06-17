<template>
  <div class="bg-white rounded-lg shadow p-6 mb-4">
    <h1 class="text-2xl font-semibold mb-4">Production Tracking</h1>
    <div>
      <form @submit.prevent="addProductionRecord" class="mb-4">
        <div class="flex items-center mb-4">
          <label for="productName" class="mr-2">Product Name:</label>
          <input type="text" id="productName" v-model="newProductName" class="border border-gray-300 rounded-md px-2 py-1">
        </div>
        <div class="flex items-center mb-4">
          <label for="quantity" class="mr-2">Quantity:</label>
          <input type="number" id="quantity" v-model="newQuantity" class="border border-gray-300 rounded-md px-2 py-1">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Production Record</button>
      </form>
      <ul>
        <li v-for="record in productionRecords" :key="record.id" class="border-b border-gray-200 py-2">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-lg font-semibold text-gray-800">{{ record.productName }}</p>
              <p class="text-sm text-gray-500">{{ record.quantity }} units</p>
            </div>
            <div>
              <button @click="editProductionRecord(record)" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button @click="deleteProductionRecord(record.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
          <div v-if="editingRecordId === record.id" class="mt-2 edit-form">
            <input type="text" v-model="editingProductName" class="border border-gray-300 rounded-md px-2 py-1">
            <input type="number" v-model="editingQuantity" class="border border-gray-300 rounded-md px-2 py-1">
            <button @click="saveProductionRecord" class="bg-green-500 text-white px-2 py-1 rounded">Save</button>
            <button @click="cancelEdit" class="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productionRecords: [
        { id: 1, productName: 'Product A', quantity: 100 },
        { id: 2, productName: 'Product B', quantity: 50 }
      ],
      newProductName: '',
      newQuantity: '',
      editingRecordId: null,
      editingProductName: '',
      editingQuantity: ''
    };
  },
  methods: {
    addProductionRecord() {
      if (this.newProductName && this.newQuantity) {
        this.productionRecords.push({ 
          id: this.productionRecords.length + 1, 
          productName: this.newProductName, 
          quantity: parseInt(this.newQuantity) 
        });
        this.newProductName = '';
        this.newQuantity = '';
      }
    },
    editProductionRecord(record) {
      this.editingRecordId = record.id;
      this.editingProductName = record.productName;
      this.editingQuantity = record.quantity;
    },
    saveProductionRecord() {
      const index = this.productionRecords.findIndex(record => record.id === this.editingRecordId);
      if (index !== -1) {
        this.productionRecords[index].productName = this.editingProductName;
        this.productionRecords[index].quantity = parseInt(this.editingQuantity);
        this.editingRecordId = null;
        this.editingProductName = '';
        this.editingQuantity = '';
      }
    },
    cancelEdit() {
      this.editingRecordId = null;
      this.editingProductName = '';
      this.editingQuantity = '';
    },
    deleteProductionRecord(id) {
      this.productionRecords = this.productionRecords.filter(record => record.id !== id);
    }
  }
};
</script>

<style scoped>
.edit-form {
  display: flex;
  align-items: center;
}

.edit-form input[type="text"],
.edit-form input[type="number"] {
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.edit-form button {
  background-color: #4a90e2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

.edit-form button:last-child {
  margin-right: 0;
}

.edit-form button:hover {
  background-color: #2c5282;
}
</style>

