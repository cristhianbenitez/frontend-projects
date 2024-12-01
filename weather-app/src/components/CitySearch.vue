<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import searchIcon from '@assets/Search.svg';

const props = defineProps({
  onCitySelect: {
    type: Function,
    required: true
  }
});

const searchResults = ref([]);
const isDropdownOpen = ref(false);

const handleClick = (result) => {
  props.onCitySelect(result);
  searchResults.value = [];
  isDropdownOpen.value = false;
};

const handleSearchCity = async (e) => {
  const city = e.target.value;
  if (city.length < 1) {
    searchResults.value = [];
    return;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
        import.meta.env.VITE_OPENWEATHERMAP_API_KEY
      }`
    );
    const data = await response.json();
    searchResults.value = data.map((result) => ({
      id: `${result.lat}-${result.lon}`,
      name: `${result.name}, ${result.country}`,
      lat: result.lat,
      lon: result.lon
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    searchResults.value = [];
  }
};

const handleClickOutside = (event) => {
  const searchContainer = document.querySelector('.search-container');
  if (searchContainer && !searchContainer.contains(event.target)) {
    isDropdownOpen.value = false;
    searchResults.value = [];
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="search-container">
    <form class="header__search">
      <img :src="searchIcon" alt="search icon" class="header__search__icon" />
      <input type="search" placeholder="Search a city..." @input="handleSearchCity" class="header__search__input" />
    </form>

    <div v-if="searchResults?.length" class="search-dropdown">
      <ul>
        <li v-for="result in searchResults" :key="result.id" @click="handleClick(result)" class="search-dropdown__item">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.header__search {
  background: var(--clr-navy);
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header__search__input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--clr-white);
}

.header__search__input::placeholder {
  color: var(--clr-gray);
  font-size: var(--fs-body);
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 240px;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--clr-navy);
  border-radius: 1rem;
  margin-top: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  scrollbar-width: none;
}

.search-dropdown__item {
  padding: 0.75rem 1rem;
  color: var(--clr-white);
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-dropdown__item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
