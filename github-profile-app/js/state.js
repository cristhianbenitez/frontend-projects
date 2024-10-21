export const state = {
  username: 'github',
  userData: null,
  userRepos: null,
  displayedRepos: 4,
  isLoading: true,
  error: null,
  suggestions: []
};

export const setState = (newState) => {
  Object.assign(state, newState);
};

export const getState = () => {
  return state;
};
