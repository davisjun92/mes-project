<template>
  <div class="bg-white rounded-lg shadow p-6 mb-4">
    <h1 class="text-2xl font-semibold mb-4">Quality Control</h1>
    <div>
      <form @submit.prevent="scheduleInspection" class="mb-4">
        <div class="flex items-center mb-4">
          <label for="inspectionDate" class="mr-2">Inspection Date:</label>
          <input type="date" id="inspectionDate" v-model="newInspectionDate" class="border border-gray-300 rounded-md px-2 py-1">
        </div>
        <div class="flex items-center mb-4">
          <label for="inspectionResult" class="mr-2">Inspection Result:</label>
          <select id="inspectionResult" v-model="newInspectionResult" class="border border-gray-300 rounded-md px-2 py-1">
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Schedule Inspection</button>
      </form>
      <ul>
        <li v-for="inspection in inspections" :key="inspection.id" class="border-b border-gray-200 py-2">
          <div>
            <p class="text-lg font-semibold text-gray-800">{{ inspection.date }}</p>
            <p class="text-sm text-gray-500">{{ inspection.result }}</p>
          </div>
          <div>
            <button @click="flagDefect(inspection.id)" class="bg-red-500 text-white px-2 py-1 rounded mr-2">Flag Defect</button>
            <button @click="deleteInspection(inspection.id)" class="bg-gray-500 text-white px-2 py-1 rounded">Delete</button>
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
      inspections: [
        { id: 1, date: '2024-06-17', result: 'Pass' },
        { id: 2, date: '2024-06-18', result: 'Fail' }
      ],
      newInspectionDate: '',
      newInspectionResult: ''
    };
  },
  methods: {
    scheduleInspection() {
      if (this.newInspectionDate && this.newInspectionResult) {
        this.inspections.push({ 
          id: this.inspections.length + 1, 
          date: this.newInspectionDate, 
          result: this.newInspectionResult 
        });
        this.newInspectionDate = '';
        this.newInspectionResult = '';
      }
    },
    flagDefect(id) {
      const index = this.inspections.findIndex(inspection => inspection.id === id);
      if (index !== -1) {
        this.inspections[index].result = 'Fail';
      }
    },
    deleteInspection(id) {
      this.inspections = this.inspections.filter(inspection => inspection.id !== id);
    }
  }
};
</script>