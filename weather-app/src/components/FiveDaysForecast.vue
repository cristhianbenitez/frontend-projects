<script setup>
import { ref, onMounted, watch } from 'vue';
import { getFiveDayForecast } from '@api/weatherApi';

const props = defineProps({
  measurementSystem: String,
  currentPosition: Object
});

const fiveDayForecast = ref([]);

onMounted(() => {
  fetchFiveDayForecast();
});

const fetchFiveDayForecast = async () => {
  const forecastData = await getFiveDayForecast(props.currentPosition, props.measurementSystem);
  fiveDayForecast.value = forecastData;
};

const formattedDate = (date) => {
  const today = new Date();
  const inputDate = new Date(date);
  if (inputDate.toDateString() === today.toDateString()) {
    return 'Today';
  }
  return inputDate.toLocaleDateString('en-US', { weekday: 'short' });
};

watch(
  [() => props.currentPosition, () => props.measurementSystem],
  () => {
    fetchFiveDayForecast();
  },
  { deep: true }
);

// Add this computed function to calculate thermometer bar styles
const getThermometerStyles = (minTemp, maxTemp, scaleMin, scaleMax) => {
  const scaleRange = scaleMax - scaleMin;
  const barStart = ((minTemp - scaleMin) / scaleRange) * 100;
  const barWidth = ((maxTemp - minTemp) / scaleRange) * 100;

  return {
    width: `${barWidth}%`,
    left: `${barStart}%`
  };
};
</script>

<template>
  <div class="fiveDay-forecast" v-if="fiveDayForecast.length > 0">
    <h3 class="fiveDay-forecast__title">Five Day Forecast</h3>
    <ul class="fiveDay-forecast__list">
      <li v-for="day in fiveDayForecast" :key="day.dt" class="fiveDay-forecast__list__item">
        <h3 class="fiveDay-forecast__list__item__date">{{ formattedDate(day.dt_txt) }}</h3>
        <div class="fiveDay-forecast__list__item__content">
          <div class="fiveDay-forecast__list__item__description">
            <div class="fiveDay-forecast__list__item__icon">
              <img
                :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                :alt="day.weather[0].description"
              />
            </div>
            <p>{{ day.weather[0].description }}</p>
          </div>
          <div class="fiveDay-forecast__list__item__temp">
            <span>{{ Math.floor(day.temp_min) }}°</span>
            <div class="fiveDay-forecast__list__item__temp__thermometer">
              <div
                class="fiveDay-forecast__list__item__temp__thermometer__bar"
                :style="getThermometerStyles(day.temp_min, day.temp_max, day.scale_min, day.scale_max)"
              ></div>
            </div>
            <span>{{ Math.round(day.temp_max) }}°</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fiveDay-forecast {
  grid-area: five-day;
}

.fiveDay-forecast__title {
  font-size: var(--fs-subtitle);
  font-weight: var(--fw-medium);
  margin-bottom: 1.25rem;
}

.fiveDay-forecast__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fiveDay-forecast__list__item {
  display: flex;
  align-items: center;
  background: var(--clr-navy);
  padding: 0.75rem 1.25rem;
  border-radius: 1rem;
}

.fiveDay-forecast__list__item__date {
  font-size: var(--fs-subtitle);
  font-weight: var(--fw-medium);
  width: 140px;
}

.fiveDay-forecast__list__item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.fiveDay-forecast__list__item__description {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--fs-small);
  color: var(--clr-gray);
  text-transform: capitalize;
  gap: 0.75rem;
}

.fiveDay-forecast__list__item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 36px;
  overflow: hidden;
}

.fiveDay-forecast__list__item__icon img {
  width: 62px;
  height: 62px;
  object-fit: cover;
}

.fiveDay-forecast__list__item__temp {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.fiveDay-forecast__list__item__temp__thermometer {
  position: relative;
  width: 360px;
  height: 6px;
  background: var(--clr-dark-blue);
  border-radius: 1rem;
  overflow: hidden;
}

.fiveDay-forecast__list__item__temp__thermometer__bar {
  position: absolute;
  height: 100%;
  background: var(--clr-blue);
  border-radius: 1rem;
}
</style>
