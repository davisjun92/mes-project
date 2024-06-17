<template>
    <div v-if="chartData">
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const chartRef = ref(null);
  
      onMounted(() => {
        if (chartRef.value) {
          const ctx = chartRef.value.getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: props.chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
      });
  
      return {
        chartRef
      };
    }
  };
  </script>