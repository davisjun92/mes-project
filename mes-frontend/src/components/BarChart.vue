<template>
    <div class="relative w-full h-64 md:h-96 max-w-xl mx-auto">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js/auto';
  
  export default {
    props: {
      chartData: Object,
      options: Object
    },
    mounted() {
      this.renderChart();
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: this.chartData,
          options: {
            ...this.options,
            responsive: true,
            maintainAspectRatio: false
          }
        });
      },
      handleResize() {
        if (this.chart) {
          this.chart.resize();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .relative {
    position: relative;
  }
  </style>
  