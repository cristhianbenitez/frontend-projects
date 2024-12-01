<script setup>
const props = defineProps({
  handleSubmit: Function,
  toggleMeasurementSystem: Function,
  measurementSystem: String
});

import CitySearch from '@components/CitySearch.vue';
import UnitToggle from '@components/UnitToggle.vue';
</script>

<template>
  <header class="header container">
    <CitySearch :onCitySelect="handleSubmit" />
    <UnitToggle @toggle="toggleMeasurementSystem" :measurementSystem="measurementSystem" />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.25rem;
}
</style>
