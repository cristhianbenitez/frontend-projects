<script setup>
const props = defineProps({
  metricSystem: {
    type: String,
    required: true
  }
});

import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';

import windIcon from '../assets/wind.png';

const weather = ref({
  main: {},
  name: '',
  icon: '',
  description: '',
  wind: {}
});

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

onMounted(() => {
  fetchCurrentLocationWeather();
});

const fetchCurrentLocationWeather = async () => {
  // const position = await new Promise((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject);
  // });

  // Temporarily use helsinki coordinates

  const position = {
    coords: {
      latitude: 60.192059,
      longitude: 24.945831
    }
  };
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=${props.metricSystem}`
    );
    weather.value = data;
    weather.value.icon = data.weather[0].icon;
    weather.value.description = data.weather[0].description;
  } catch (error) {
    console.error('Error fetching weather:', error);
    weather.value = null;
  }
};

watch(
  () => props.metricSystem,
  () => {
    fetchCurrentLocationWeather();
  }
);

const metricSystemSymbol = computed(() => (props.metricSystem === 'imperial' ? '°F' : '°C'));
const windSpeedUnit = computed(() => (props.metricSystem === 'imperial' ? 'mph' : 'm/s'));
</script>

<template>
  <div>
    <div v-if="weather" class="current-weather">
      <div class="current-weather__row">
        <h2 class="current-weather__temp">{{ Math.round(weather.main.temp) }} {{ metricSystemSymbol }}</h2>
        <div class="current-weather__location">
          <h3>{{ weather.name }}</h3>
          <p>{{ new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }}</p>
        </div>
      </div>

      <div class="current-weather__row">
        <div class="current-weather__description">
          <img :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" alt="" />
          {{ weather.description }}
        </div>
        <div class="current-weather__wind">
          <img :src="windIcon" alt="" />
          {{ weather.wind.speed }} {{ windSpeedUnit }}
        </div>
      </div>

      <div class="current-weather__row">
        <div class="current-weather__feels-like">Feels like: {{ weather.main.feels_like }}</div>
        <div class="current-weather__temp-range">
          {{ Math.round(weather.main.temp) }} {{ metricSystemSymbol }} to {{ Math.round(weather.main.feels_like) }}
          {{ metricSystemSymbol }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current-weather {
  background: var(--navy);
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  max-width: 340px;
  width: 340px;
  border-radius: 1rem;
}

.current-weather__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.current-weather__temp {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}

.current-weather__description {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: capitalize;
}

.current-weather__description img {
  width: 50px;
  height: 50px;
}

.current-weather__feels-like {
  font-size: 0.9rem;
  color: #666;
}

.current-weather__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
}

.current-weather__location h3 {
  margin: 0;
  font-size: 1.5rem;
}

.current-weather__location p {
  margin: 0.5rem 0 0;
  color: #666;
}

.current-weather__wind {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.current-weather__wind img {
  width: 20px;
  height: 20px;
}

.current-weather__temp-range {
  font-size: 0.9rem;
  color: #666;
  text-align: right;
}
</style>
