<script setup>
const props = defineProps({
  measurementSystem: String
});

defineEmits(['toggle']);
</script>

<template>
  <div class="unit-toggle" @click="$emit('toggle')">
    <span class="unit" :class="{ active: measurementSystem === 'metric' }">°C</span>
    <span class="unit" :class="{ active: measurementSystem === 'imperial' }">°F</span>
  </div>
</template>

<style scoped>
.unit-toggle {
  border-radius: 1.5rem;
  padding: 0.25rem;
  background: var(--clr-navy);
  color: var(--clr-white);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.unit {
  width: 32px;
  height: 32px;
  border-radius: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}

.unit.active {
  background: var(--clr-white);
  color: var(--clr-dark-blue);
}
</style>
