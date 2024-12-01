<script setup>
import WeatherCard from './components/WeatherCard.vue';
import { ref } from 'vue';

const search = ref('');
const metricSystem = ref('metric');

const handleSubmit = () => {
  console.log(search.value);
};

const toggleMetricSystem = () => {
  metricSystem.value = metricSystem.value === 'imperial' ? 'metric' : 'imperial';
};
</script>

<template>
  <header class="header container">
    <form @submit.prevent="handleSubmit">
      <input type="search" placeholder="Search for a city" v-model="search" />
    </form>

    <div class="metric-system">
      <button @click="toggleMetricSystem">Imperial/Metric</button>
    </div>
  </header>
  <main class="main container">
    <div class="col">
      <div class="weather-card-wrapper">
        <WeatherCard :metricSystem="metricSystem" />
      </div>
      <div class="other-cities-wrapper">
        <h3>Other Large Cities</h3>
        <div class="other-cities__list"></div>
      </div>
    </div>
    <div class="col"></div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
}

.container {
  max-width: 1280px;
  padding-inline: 1.5rem;
  margin-top: 1.75rem;
  margin-inline: auto;
}

.col {
  display: flex;
  flex-direction: column;
}

@media (min-width: 480px) {
  .container {
    padding-inline: 2rem;
  }
}

@media (min-width: 768px) {
  .container {
    padding-inline: 4.5rem;
  }
}
</style>
