import { state, setState } from './state.js';
import { UserInfo } from './UserInfo.js';
import { UserRepositories } from './UserRepositories.js';
import { SearchBar } from './SearchBar.js';

const root = document.getElementById('root');

const fetchData = async (username) => {
  try {
    setState({ isLoading: true, error: null });
    await UserInfo.fetchUser(username);
    await UserRepositories.fetchRepos(username);
    setState({ isLoading: false });
  } catch (error) {
    console.error('Error fetching data:', error);
    setState({ error: 'Failed to fetch data', isLoading: false });
  }
};

const handleStateChange = (username) => {
  setState({ username });
  render();
};

const handleSearch = (e) => {
  const username = e.target.value;
  const suggestions = document.getElementById('search-bar-suggestions');
  suggestions.innerHTML = '';
  if (username) {
    suggestions.innerHTML = '<li>Loading...</li>';
  }
  setState({ username });
  render();
};

const render = async () => {
  // Initial render to show loading state
  if (state.isLoading) {
    root.innerHTML = '<p>Loading...</p>';
  }
  if (state.error) {
    content = `<p>Error: ${state.error}</p>`;
  }
  //
  await fetchData(state.username);
  // Render based on the final state
  root.innerHTML = `
    <header class="header">
      ${SearchBar.render()}
    </header>
    <main class="main">
      ${UserInfo.render()}
      <h2 class="profile-details__user-info-name" aria-label="Profile name">${state.userData.name}</h2>
      ${
        state.userData.bio
          ? `<p class="profile-details__user-info-bio" aria-label="Profile bio">${state.userData.bio}</p>`
          : `<p class="profile-details__user-info-bio" aria-label="Profile bio">How people build software</p>`
      }
      ${UserRepositories.render()}
    </main>
    `;
  UserRepositories.attachEventListeners();
};

// Initialize the app
const init = () => {
  setState({ onChange: handleStateChange });
  render();
};

init();
