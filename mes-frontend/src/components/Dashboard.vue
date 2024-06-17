<template>
  <div class="h-screen flex flex-col">
    <div class="bg-white rounded-lg shadow p-6 mb-4">
      <h1 class="text-2xl font-semibold mb-4">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-100 rounded p-4">
          <p class="text-lg font-semibold text-blue-800">Production Status:</p>
          <p class="text-3xl font-bold text-blue-600">{{ productionStatus }}</p>
        </div>
        <div class="bg-green-100 rounded p-4">
          <p class="text-lg font-semibold text-green-800">Machine Utilization:</p>
          <p class="text-3xl font-bold text-green-600">{{ machineUtilization }}</p>
        </div>
        <div class="bg-red-100 rounded p-4">
          <p class="text-lg font-semibold text-red-800">Product Defect Rate:</p>
          <p class="text-3xl font-bold text-red-600">{{ defectRate }}</p>
        </div>
      </div>
      <div class="flex-grow" v-if="chartData.labels.length">
        <bar-chart :chartData="chartData" :options="chartOptions"></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BarChart from './BarChart.vue';

export default {
  components: {
    BarChart
  },
  data() {
    return {
      productionStatus: '',
      machineUtilization: '',
      defectRate: '',
      chartData: {
        labels: [],
        datasets: [{
          label: 'Monthly Data',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/dashboard');
        const data = response.data;
        this.productionStatus = data.productionStatus;
        this.machineUtilization = data.machineUtilization;
        this.defectRate = data.defectRate;
        this.chartData.labels = data.chartData.labels;
        this.chartData.datasets[0].data = data.chartData.data;
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
  }
}
</script>