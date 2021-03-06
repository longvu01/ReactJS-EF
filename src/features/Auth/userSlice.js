import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

// Async acts
const register = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const login = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

//
const initialState = {
  current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  settings: {},
  isRequireLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRequireLogin(state) {
      state.isRequireLogin = true;
    },

    unSetRequireLogin(state) {
      state.isRequireLogin = false;
    },

    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      // reset redux user
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

const { actions, reducer } = userSlice;
// Sync actions
export const { setRequireLogin, unSetRequireLogin, logout } = actions;
// Async actions
export { register, login };
// Reducer
export default reducer;
