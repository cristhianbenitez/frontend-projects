<script setup>
import { ref, onMounted, watch } from 'vue';
import { getHourlyForecast } from '@api/weatherApi';

const props = defineProps({
  measurementSystem: String,
  currentPosition: Object
});

const hourlyForecast = ref([]);

onMounted(() => {
  fetchHourlyForecast();
});

const fetchHourlyForecast = async () => {
  const data = await getHourlyForecast(props.currentPosition, props.measurementSystem);
  const displayedHours = data.list.slice(0, 8);
  hourlyForecast.value = displayedHours;
};

watch(
  [() => props.currentPosition, () => props.measurementSystem],
  () => {
    fetchHourlyForecast();
  },
  { deep: true }
);
</script>

<template>
  <ul class="hourly-forecast">
    <li v-for="hour in hourlyForecast" :key="hour.dt" class="hourly-forecast__item">
      <div class="hourly-forecast__top">
        <p class="hourly-forecast__time">
          {{ new Date(hour.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }}
        </p>
        <hr class="hourly-forecast__divider" />
        <div class="hourly-forecast__icon">
          <img :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`" alt="weather icon" />
        </div>
        <p class="hourly-forecast__description">{{ hour.weather[0].description }}</p>
      </div>
      <div class="hourly-forecast__bottom">
        <p class="hourly-forecast__temp">{{ Math.round(hour.main.temp) }}°</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.hourly-forecast {
  grid-area: hourly;
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.hourly-forecast__item {
  max-width: 80px;
  width: 100%;
  background: var(--clr-navy);
  border-radius: 1rem;
  padding: 1rem 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* gap: 1.25rem; */
}

.hourly-forecast__time {
  font-size: var(--fs-small);
  margin-bottom: 0.75rem;
}

.hourly-forecast__divider {
  height: 1px;
  width: 100%;
  background-color: var(--clr-dark-blue);
  border: none;
}

.hourly-forecast__icon {
  /* margin-top: 1rem; */
  margin-bottom: 0.25rem;
}

.hourly-forecast__description {
  font-size: var(--fs-caption);
  font-weight: var(--fw-medium);
  color: var(--clr-gray);
  text-transform: capitalize;
}

.hourly-forecast__temp {
  font-size: calc(var(--fs-heading) * 1.25);
  font-weight: var(--fw-bold);
}
</style>
