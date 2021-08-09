import axios from 'axios';
import { api } from '../constants';

export const getUser = () => async (dispatch, state) => {
  try {
    dispatch({ type: 'USER_DETAILS_RESET' });
    dispatch({ type: 'APP_INIALIZATION_START' });
    const { token } = state().userToken;

    if (!token) {
      dispatch({ type: 'USER_LOGOUT' });
      dispatch({ type: 'APP_INITIALIZED' });
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${api}/api/auth/user`, config);
    if (res.data.success) {
      dispatch({ type: 'USER_DETAILS_SUCCESS', payload: res.data.user });
      dispatch({ type: 'APP_INITIALIZED' });
    }
  } catch (e) {
    const message = e.response ? e.response.data.error : e.message;

    if (message === 'Not authorized, token failed')
      dispatch({ type: 'USER_LOGOUT' });
    dispatch({ type: 'APP_INITIALIZED' });

    console.log(e);
  }
};
