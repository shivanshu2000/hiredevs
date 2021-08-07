export const asyncReducer = (
  state = { initialized: false, loading: false },
  action
) => {
  switch (action.type) {
    case 'APP_INIALIZATION_START':
      return { initialized: false, loading: true };
    case 'APP_INITIALIZED':
      return { initialized: true, loading: false };
    default:
      return state;
  }
};
