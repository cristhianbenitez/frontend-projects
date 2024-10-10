import { setState } from './state';

export const UserRepositories = {
  fetchRepos: async (username) => {
    try {
      setState({ isLoading: true, error: null });
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const data = await response.json();
      setState({ userRepos: data, isLoading: false });
    } catch (error) {
      setState({ error: error.message, isLoading: false });
    }
  },
  render: (repos) => {
    return `
      <section class="profile-repositories" aria-label="User repositories">
        <h2>Repositories</h2>
        <ul class="profile-repositories__list">
          ${repos
            .map(
              (repo) => `
         <li class="profile-repositories__item" aria-label="Repository">
            <h3 class="profile-repositories__item-title">${repo.name}</h3>
            <p class="profile-repositories__item-description">
              ${repo.description || ''}
            </p>
            <div class="profile-repositories__item-details">
              ${
                repo.license
                  ? `<span class="profile-repositories__item-details-value">
                <img src="./assets/Chield_alt.svg" alt="Chield" />
                ${repo.license.name}
              </span>`
                  : ''
              }
              <span class="profile-repositories__item-details-value">
                <img src="./assets/Star.svg" alt="Star" />
                ${repo.stargazers_count}
              </span>
              <span class="profile-repositories__item-details-value">
                <img src="./assets/Nesting.svg" alt="Nesting" />
                ${repo.forks_count}
              </span>
              <span class="profile-repositories__item-details-value">
                updated ${calculateDaysAgo(repo.updated_at)} days ago
              </span>
            </div>
          </li>
          `
            )
            .join('')}
        </ul>
        <button class="profile-repositories__view-all">View All Repositories</button>
      </section>
    `;
  }
};

const calculateDaysAgo = (updatedAt) => {
  const now = new Date();
  const updateDate = new Date(updatedAt);
  const diffTime = Math.abs(now - updateDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
