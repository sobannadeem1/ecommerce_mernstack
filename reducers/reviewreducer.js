import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendapi } from "@/config";
import axios from "axios";

export const reviewcreate = createAsyncThunk(
  "review/reviewcreate",
  async (reviewdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendapi}/review/reviewcreate`,
        reviewdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Review creation failed");
    }
  }
);

export const getreview = createAsyncThunk(
  "review/getreview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendapi}/review/getreview`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to get reviews");
    }
  }
);

export const getreviewbyid = createAsyncThunk(
  "review/getreviewbyid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendapi}/review/getreviewbyid/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch review");
    }
  }
);

const initialState = {
  reviews: [],
  review: null,
  loading: false,
  error: null,
};

const reviewslice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reviewcreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewcreate.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(reviewcreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getreview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getreviewbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getreviewbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addCase(getreviewbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewslice.reducer;
