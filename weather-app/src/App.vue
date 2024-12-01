<script setup>
import { WeatherCard, Header, OtherCities, HourlyForecast, FiveDaysForecast } from '@components';

import { ref, onMounted } from 'vue';

const currentPosition = ref({
  lat: null,
  lon: null
});
const measurementSystem = ref('metric');
const isLoading = ref(true);

const handleSubmit = (newPosition) => {
  isLoading.value = true;
  fetchPosition({
    lat: newPosition.lat,
    lon: newPosition.lon
  });
};

const toggleMeasurementSystem = () => {
  measurementSystem.value = measurementSystem.value === 'imperial' ? 'metric' : 'imperial';
};

const fetchPosition = async (coordinates = null) => {
  try {
    if (coordinates) {
      currentPosition.value = coordinates;
    } else {
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      currentPosition.value = {
        lat: coords.latitude,
        lon: coords.longitude
      };
    }
  } catch (error) {
    currentPosition.value = {
      lat: 60.192059,
      lon: 24.945831
    };
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPosition();
});
</script>

<template>
  <Header
    :handleSubmit="handleSubmit"
    :toggleMeasurementSystem="toggleMeasurementSystem"
    :measurementSystem="measurementSystem"
  />
  <main v-if="!isLoading" class="main container">
    <WeatherCard :measurementSystem="measurementSystem" :currentPosition="currentPosition" />
    <OtherCities :measurementSystem="measurementSystem" :currentPosition="currentPosition" />
    <HourlyForecast :measurementSystem="measurementSystem" :currentPosition="currentPosition" />
    <FiveDaysForecast :measurementSystem="measurementSystem" :currentPosition="currentPosition" />
  </main>
  <div v-else class="loading">Loading weather data...</div>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-areas:
    'weather hourly'
    'other-cities five-day';
  column-gap: 1.75rem;
  row-gap: 3rem;
}

@media (min-width: 768px) {
  .main {
    column-gap: 2.75rem;
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: var(--fs-subtitle);
  color: var(--clr-gray);
}
</style>
