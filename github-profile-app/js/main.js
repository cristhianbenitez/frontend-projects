import { state, setState } from './state.js';
import { UserInfo } from './UserInfo.js';
import { UserRepositories } from './UserRepositories.js';

const elements = {
  main: document.getElementById('main')
};

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

const handleStateChange = () => {
  render();
};

const render = async () => {
  // Initial render to show loading state
  if (state.isLoading) {
    elements.main.innerHTML = '<p>Loading...</p>';
  }
  if (state.error) {
    content = `<p>Error: ${state.error}</p>`;
  }
  //
  await fetchData(state.username);
  // Render based on the final state
  elements.main.innerHTML = `
      ${UserInfo.render()}
      <h2 class="profile-details__user-info-name" aria-label="Profile name">${state.userData.name}</h2>
      ${
        state.userData.bio
          ? `<p class="profile-details__user-info-bio" aria-label="Profile bio">${state.userData.bio}</p>`
          : `<p class="profile-details__user-info-bio" aria-label="Profile bio">How people build software</p>`
      }
      ${UserRepositories.render()}
    `;
  UserRepositories.attachEventListeners();
};

// Initialize the app
const init = () => {
  setState({ onChange: handleStateChange });
  render();
};

init();
