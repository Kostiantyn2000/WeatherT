

<script >
import { defineComponent } from "vue";
import Chart from "chart.js/auto";

export default defineComponent({
  mounted() {
    this.createTemperatureChart()
  },
  methods: {
    createTemperatureChart() {
      const ctx = this.$refs.temperatureChart;

      const chartData = JSON.parse(localStorage.getItem('Chart'))

      const data = {
        labels:   chartData?.days,
        datasets: [
          {
            label: "Температура (°C)",
            data: chartData.temps,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

  new Chart(ctx, {
        type: "line",
        data: data,
        options: options,
      });
    }, 
  },
});
</script>

<template>
  <div class="wrapper-canvas">
    <canvas ref="temperatureChart" class="chart-canvas"></canvas>
  </div>
</template>

<style scoped>
.wrapper-canvas {
  height: 300px;
}

.chart-canvas {
  width: 100%;
  margin: 0 auto;
}
</style>
