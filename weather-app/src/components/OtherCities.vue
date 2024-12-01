<script setup>
import { getWeatherByCity } from '@api/weatherApi';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  measurementSystem: String,
  position: Object
});

const cities = ['New York', 'Copenhagen', 'Ho Chi Minh City'];

const otherLargeCities = ref([]);

onMounted(() => {
  fetchOtherCities();
});

const fetchOtherCities = async () => {
  const cityData = await Promise.all(cities.map((city) => getWeatherByCity(city, props.measurementSystem)));
  otherLargeCities.value = cityData;
};

watch(
  [() => props.currentPosition, () => props.measurementSystem],
  () => {
    fetchOtherCities();
  },
  { deep: true }
);
</script>

<template>
  <div class="other-cities">
    <h3 class="other-cities__title">Other Large Cities</h3>
    <ul class="other-cities__list">
      <li v-for="city in otherLargeCities" :key="city.id" class="other-cities__list__item">
        <div class="other-cities__list__item--left">
          <p class="other-cities__list__item__country">{{ city.sys.country }}</p>
          <p class="other-cities__list__item__name">{{ city.name }}</p>
          <p class="other-cities__list__item__description">{{ city.weather[0].main }}</p>
        </div>
        <div class="other-cities__list__item--right">
          <div class="other-cities__list__item__icon">
            <img :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`" alt="weather icon" />
          </div>
          <p class="other-cities__list__item__temp">{{ Math.round(city.main.temp) }}°</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.other-cities {
  grid-area: other-cities;
}

.other-cities__title {
  font-size: var(--fs-subtitle);
  font-weight: var(--fw-medium);
  margin-bottom: 1.25rem;
}

.other-cities__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.other-cities__list__item {
  display: flex;
  justify-content: space-between;
  background: var(--clr-navy);
  padding: 1.25rem;
  border-radius: 1rem;
}

.other-cities__list__item__country {
  font-size: var(--fs-small);
  color: var(--clr-gray);
  margin-bottom: 0.25rem;
}

.other-cities__list__item__name {
  font-size: var(--fs-subtitle);
  font-weight: var(--fw-bold);
  margin-bottom: 0.75rem;
}

.other-cities__list__item__description {
  font-size: var(--fs-caption);
  color: var(--clr-white);
  text-transform: capitalize;
}

.other-cities__list__item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 36px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.other-cities__list__item__icon img {
  width: 62px;
  height: 62px;
  object-fit: cover;
}

.other-cities__list__item__temp {
  font-size: var(--fs-subtitle);
  font-weight: var(--fw-bold);
  text-align: right;
}
</style>
