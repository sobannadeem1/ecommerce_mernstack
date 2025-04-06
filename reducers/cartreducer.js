import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendapi } from "@/config";
import axios from "axios";

export const addtocart = createAsyncThunk(
  "cart/addtocart",
  async (cartdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendapi}/cart/addtocart`,
        cartdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getcartbyid = createAsyncThunk(
  "cart/getcartbyid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendapi}/cart/getcartbyid/${id}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletecart = createAsyncThunk(
  "cart/deletecart",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${backendapi}/cart/deletecart/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State
const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addtocart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(addtocart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getcartbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getcartbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getcartbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletecart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletecart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((cart) => cart._id !== action.payload);
      })
      .addCase(deletecart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartslice.reducer;
