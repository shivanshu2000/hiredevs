export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SIGNUP_REQUEST':
      return { loading: true };
    case 'USER_SIGNUP_SUCCESS':
      return { loading: false };
    case 'USER_SIGNUP_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userTokenReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case 'SET_USER_TOKEN':
      return { loading: false, token: action.payload };
    case 'RESET_TOKEN':
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case 'USER_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'USER_DETAILS_SUCCESS':
      return { user: action.payload };
    case 'USER_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_DETAILS_RESET':
      return { user: null };
    default:
      return state;
  }
};

export const userDashboardReducer = (
  state = { dashboardDetails: null },
  action
) => {
  switch (action.type) {
    case 'USER_DASHBOARD_DETAILS_SUCCESS':
      return { dashboardDetails: action.payload };

    case 'USER_DASHBOARD_DETAILS_RESET':
      return { dashboardDetails: null };
    default:
      return state;
  }
};
