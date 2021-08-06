import { combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDetailsReducer,
  userLoginReducer,
  userSignupReducer,
  userTokenReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  userDetails: userDetailsReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userToken: userTokenReducer,
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

export default store;
