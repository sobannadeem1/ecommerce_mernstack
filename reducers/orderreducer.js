import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendapi } from "@/config";
import axios from "axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const ordercreate = createAsyncThunk(
  "order/ordercreate",
  async (orderdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendapi}/order/ordercreate`,
        orderdata,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getorderbyid = createAsyncThunk(
  "order/getorderbyid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendapi}/order/getorderbyid/${id}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getallorders = createAsyncThunk(
  "order/getallorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendapi}/order/getallorders`,
        getAuthHeaders()
      );
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteorder = createAsyncThunk(
  "order/deleteorder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${backendapi}/order/deleteorder/${id}`,
        getAuthHeaders()
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateorder = createAsyncThunk(
  "order/updateorder",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backendapi}/order/updateorder/${id}`,
        updatedData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  orders: [],
  singleOrder: null,
  loading: false,
  error: null,
};

// Order Slice
const orderslice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordercreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ordercreate.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(ordercreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getorderbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getorderbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getorderbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getallorders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallorders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })
      .addCase(getallorders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteorder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteorder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateorder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateorder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderslice.reducer;
