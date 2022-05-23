import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reviewApi from 'api/reviewApi';

// Async acts
const review = createAsyncThunk('review', async (payload) => {
  const data = await reviewApi.add(payload);

  return data;
});

//
const initialState = {
  reviews: [],
};

const userSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(review.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;
// Sync actions
export const {} = actions;
// Async actions
export { review };
// Reducer
export default reducer;
