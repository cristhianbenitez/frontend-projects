import { setState, getState } from './state';

export const UserRepositories = {
  fetchRepos: async (username) => {
    try {
      setState({ isLoading: true, error: null });
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const data = await response.json();
      setState({ userRepos: data, displayedRepos: 4, isLoading: false });
    } catch (error) {
      setState({ error: error.message, isLoading: false });
    }
  },

  loadMoreRepos: () => {
    const { userRepos, displayedRepos } = getState();
    const newDisplayedRepos = Math.min(displayedRepos + 4, userRepos.length);
    setState({ displayedRepos: newDisplayedRepos });
  },

  attachEventListeners: () => {
    const loadMoreButton = document.querySelector('.profile-repositories__view-all');
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', () => {
        UserRepositories.loadMoreRepos();
        const reposSection = document.querySelector('.profile-repositories');
        if (reposSection) {
          reposSection.innerHTML = UserRepositories.render();
          UserRepositories.attachEventListeners();
        }
      });
    }
  },

  render: () => {
    const { userRepos, displayedRepos } = getState();
    const visibleRepos = userRepos.slice(0, displayedRepos);
    const hasMoreRepos = userRepos.length > displayedRepos;

    return `
      <section class="profile-repositories" aria-label="User repositories">
        <ul class="profile-repositories__list">
          ${visibleRepos
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
                ${repo.license.name.slice(0, 3)}
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
        ${hasMoreRepos ? `<button class="profile-repositories__view-all">View all repositories</button>` : ''}
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
