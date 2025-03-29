import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL (update as needed)
const API_URL = `${import.meta.env.REACT_APP_API_URL}/api/cart`;

// Thunk to fetch cart items
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/get`, { withCredentials: true }); // Ensure cookies are sent
    console.log(response.data)
    return response.data;
  } catch (error) {

    
    return rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

// Thunk to delete a cart item
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (itemId, { rejectWithValue, dispatch }) => {
  try {
    await axios.delete(`${API_URL}/delete/${itemId}`, { withCredentials: true });
    dispatch(removeItem(itemId)); // Optimistic update
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to delete item");
  }
});

// Thunk to add an item to cart
export const addCartItem = createAsyncThunk("cart/addCartItem", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include HTTP-only cookies in the request
    });
    alert("Item Added Successfuly");
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 
      error.response?.data || 
      "Failed to add item to cart"
    );
  }
});

// Initial state
const initialState = {
  cart: null,
  loading: false,
  error: null,
  addItemSuccess: false,
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      if (state.cart) {
        state.cart.items = state.cart.items.filter(item => item._id !== action.payload);
      }
    },
    resetAddItemSuccess: (state) => {
      state.addItemSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Cart Item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Cart Item
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addItemSuccess = false;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.addItemSuccess = true;
        // If cart exists, add the new item to it
        
        state.cart=action.payload.cart;
        
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.addItemSuccess = false;
      });
  },
});

export const { removeItem, resetAddItemSuccess } = cartSlice.actions;
export default cartSlice.reducer;