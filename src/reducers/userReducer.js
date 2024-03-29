import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const checkIfLoggedIn = () => {
  return (dispatch) => {
    const isUserLoggedIn = localStorage.getItem('user');

    if (isUserLoggedIn) {
      const user = JSON.parse(isUserLoggedIn);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const signInUser = (credentials) => {
  return async (dispatch) => {
    await userService.signIn(credentials).then((user) => {
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
    });
  };
};

export const signOutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    dispatch(setUser(null));
    blogService.setToken(null);
  };
};

export const registerUser = (credentials) => {
  return async (dispatch) => {
    await userService.signUp(credentials).then((user) => {
      console.log(user);
    });
  };
};

export default userSlice.reducer;
