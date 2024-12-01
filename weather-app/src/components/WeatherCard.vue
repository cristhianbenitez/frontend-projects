<script setup>
const props = defineProps({
  measurementSystem: {
    type: String,
    required: true
  },
  currentPosition: {
    type: Object,
    required: true
  }
});

import { ref, onMounted, computed, watch } from 'vue';
import { getWeatherByCoords } from '@api/weatherApi';

import windIcon from '../assets/wind.png';

const weather = ref({
  main: {},
  name: '',
  icon: '',
  description: '',
  wind: {}
});

onMounted(() => {
  fetchCurrentLocationWeather();
});

const fetchCurrentLocationWeather = async () => {
  try {
    const data = await getWeatherByCoords(props.currentPosition, props.measurementSystem);
    weather.value = data;
    weather.value.icon = data.weather[0].icon;
    weather.value.description = data.weather[0].description;
  } catch (error) {
    weather.value = null;
  }
};

watch(
  [() => props.currentPosition, () => props.measurementSystem],
  () => {
    fetchCurrentLocationWeather();
  },
  { deep: true }
);

const measurementSystemSymbol = computed(() => (props.measurementSystem === 'imperial' ? '°F' : '°C'));
const windSpeedUnit = computed(() => (props.measurementSystem === 'imperial' ? 'mph' : 'm/s'));
</script>

<template>
  <div class="weather-card">
    <div v-if="weather" class="current-weather">
      <div class="current-weather__row">
        <h2 class="current-weather__temp">{{ Math.round(weather.main.temp) }}°</h2>
        <div class="current-weather__location">
          <h3>{{ weather.name }}</h3>
          <p>{{ new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }}</p>
        </div>
      </div>
      <div class="current-weather__row">
        <div class="current-weather__description">
          <div class="current-weather__description__icon">
            <img :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" alt="" />
          </div>
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
          {{ Math.floor(weather.main.temp_min) }}{{ measurementSystemSymbol }} to {{ Math.round(weather.main.temp_max)
          }}{{ measurementSystemSymbol }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current-weather {
  background: var(--clr-navy);
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  max-width: 340px;
  width: 340px;
  border-radius: 1rem;
  gap: 0.75rem;
}

.current-weather__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.current-weather__temp {
  font-size: calc(var(--fs-heading) * 2);
  font-weight: var(--fw-bold);
  margin: 0;
}

.current-weather__location {
  text-align: right;
}

.current-weather__location h3 {
  font-size: var(--fs-heading);
  font-weight: var(--fw-medium);
}

.current-weather__location p {
  font-size: var(--fs-small);
  color: var(--clr-gray);
}

.current-weather__description {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  font-size: var(--fs-small);
  color: var(--clr-gray);
  gap: 0.75rem;
}

.current-weather__description__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 36px;
  overflow: hidden;
}

.current-weather__description__icon img {
  width: 62px;
  height: 62px;
  object-fit: cover;
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

.current-weather__feels-like,
.current-weather__temp-range {
  font-size: var(--fs-small);
  color: var(--clr-gray);
}

.current-weather__temp-range {
  text-align: right;
}
</style>
