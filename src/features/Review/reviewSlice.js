import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ReviewDataService from 'services/review';

// Async actions
const getAllReviews = createAsyncThunk(
  'reviews/getAllReviews',
  async (payload) => {
    const querySnapshot = await ReviewDataService.getAll(payload);
    const dataReviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dataReviews;
  }
);

const addReview = createAsyncThunk('reviews/add', async (payload) => {
  ReviewDataService.add(payload);

  // Fake id to render
  payload.id = Date.now();
  return payload;
});

//
const initialState = {
  reviewList: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReviewList(state) {
      state.reviewList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.reviewList = action.payload;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviewList.unshift(action.payload);
    });
  },
});

const { actions, reducer } = reviewSlice;
// Sync actions
export const { resetReviewList } = actions;
// Async actions
export { getAllReviews, addReview };
// Reducer
export default reducer;
