import { setState, getState } from './state';

export const UserInfo = {
  fetchUser: async (username) => {
    try {
      setState({ isLoading: true, error: null });
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setState({ userData: data, isLoading: false });
    } catch (error) {
      setState({ error: error.message, isLoading: false });
    }
  },
  render: () => {
    const { userData } = getState();
    return `
      <section class="profile-details" aria-label="Profile information">
        <div class="profile-details__user-info">
          <div class="profile-details__user-info-avatar" role="img" aria-label="Profile avatar">
            <img src="${userData.avatar_url}" alt="Profile avatar" />
          </div>
        </div>

        <div class="profile-details__info">
          <div class="profile-details__info-item">
            <span class="profile-details__info-item-label">Followers</span>
            <span class="profile-details__info-item-value">${userData.followers}</span>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__info-item-label">Following</span>
            <span class="profile-details__info-item-value">${userData.following}</span>
          </div>
          <div class="profile-details__info-item">
            <span class="profile-details__info-item-label">Location</span>
            <span class="profile-details__info-item-value">${userData.location}</span>
          </div>
        </div>
      </section>
    `;
  }
};
