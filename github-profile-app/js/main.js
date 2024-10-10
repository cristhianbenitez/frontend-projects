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
      ${UserInfo.render(state.userData)}
      ${UserRepositories.render(state.userRepos)}
    `;
};

// Initialize the app
const init = () => {
  setState({ onChange: handleStateChange });
  render();
};

init();
