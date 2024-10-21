export const state = {
  username: 'octocat',
  userData: null,
  userRepos: null,
  displayedRepos: 4,
  isLoading: true,
  error: null
};

export const setState = (newState) => {
  Object.assign(state, newState);
};

export const getState = () => {
  return state;
};
