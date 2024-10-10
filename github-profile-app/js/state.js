export const state = {
  username: 'octocat',
  userData: null,
  userRepos: null,
  isLoading: true,
  error: null
};

export const setState = (newState) => {
  Object.assign(state, newState);
};
