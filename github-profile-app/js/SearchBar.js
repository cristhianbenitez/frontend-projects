import { setState, getState } from './state.js';
import SearchIcon from '../assets/Search.svg';

export const SearchBar = {
  debounceTimer: null,

  handleSearch: async (e) => {
    const username = e.target.value.trim();

    clearTimeout(SearchBar.debounceTimer);

    SearchBar.debounceTimer = setTimeout(async () => {
      console.log('Searching for:', username);
      setState({ username });

      if (username.length > 0) {
        try {
          const response = await fetch(`https://api.github.com/search/users?q=${username}&per_page=4`);
          const data = await response.json();
          const suggestions = data.items.map((user) => ({
            username: user.login,
            avatar_url: user.avatar_url
          }));
          setState({ suggestions });
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setState({ suggestions: [] });
        }
      } else {
        setState({ suggestions: [] });
      }

      // Re-render suggestions
      SearchBar.renderSuggestions();
    }, 300);
  },

  handleSuggestionClick: (e) => {
    const username = e.currentTarget.dataset.username;
    const searchBar = document.getElementById('search-bar');
    const { onChange } = getState();
    // Clear after selection
    searchBar.value = '';
    onChange(username);
    setState({ suggestions: [] });
    SearchBar.renderSuggestions();
  },

  renderSuggestions: () => {
    const { suggestions } = getState();
    const suggestionsContainer = document.querySelector('.header__search-bar-suggestions');

    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = suggestions
        .map(
          (user) => `
          <li class="header__search-bar-suggestion" data-username="${user.username}">
            <img src="${user.avatar_url}" alt="${user.username}" class="header__search-bar-suggestion-avatar" />
            <span class="header__search-bar-suggestion-username">${user.username}</span>
          </li>
        `
        )
        .join('');

      // Add click event listeners to each suggestion
      const suggestionItems = suggestionsContainer.querySelectorAll('.header__search-bar-suggestion');
      suggestionItems.forEach((item) => {
        item.addEventListener('click', SearchBar.handleSuggestionClick);
      });
    }
  },

  render: () => {
    setTimeout(() => {
      const searchBar = document.getElementById('search-bar');
      if (searchBar) {
        searchBar.addEventListener('input', SearchBar.handleSearch);
      } else {
        console.error('Search bar element not found');
      }
    }, 0);

    return `
      <div class="header__search-bar-container">
        <div class="header__search-bar">
          <img src="${SearchIcon}" alt="Search icon" class="header__search-bar-icon" />
          <input
            type="text"
          placeholder="Search GitHub username"
          id="search-bar"
            class="header__search-bar-input"
          />
        </div>
        <ul class="header__search-bar-suggestions"></ul>
      </div>
    `;
  }
};

export default SearchBar;
