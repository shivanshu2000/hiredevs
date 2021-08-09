import { combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { getUser } from './actions/userActions.js';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDashboardReducer,
  userDetailsReducer,
  userLoginReducer,
  userSignupReducer,
  userTokenReducer,
} from './reducers/userReducer';

import { asyncReducer } from './reducers/asyncReducer';

const reducer = combineReducers({
  userDetails: userDetailsReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userToken: userTokenReducer,
  userDashboardDetails: userDashboardReducer,
  async: asyncReducer,
});

const userInfoFromStorage = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const initialState = {
  userToken: { token: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.dispatch(getUser());

export default store;
