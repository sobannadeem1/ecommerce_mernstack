import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendapi } from "@/config";
import axios from "axios";

// Add Product
export const addproduct = createAsyncThunk(
  "product/add",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendapi}/product/productcreate`,
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch All Products
export const fetchproducts = createAsyncThunk(
  "product/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendapi}/product/productfind`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch Product by ID
export const fetchproductbyid = createAsyncThunk(
  "product/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendapi}/product/productfind/${id}`
      );
      if (!response.data) {
        throw new Error("Product not found");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete Product by ID
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${backendapi}/product/productdelete/${id}`);
      return id; // Return the deleted product ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Product by ID
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backendapi}/product/productupdate/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State
const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// Product Slice
const productslice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addproduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);
        } else {
          state.products = [action.payload];
        }

        state.loading = false;
      })
      .addCase(addproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Products
      .addCase(fetchproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Product by ID
      .addCase(fetchproductbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchproductbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.products)) {
          state.products = [];
        }
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productslice.reducer;
