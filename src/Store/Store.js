

import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '././Slices/productSlice';
// import productListReducer from "./Slices/cartitemSlice"
import cartItemReducer from "./Slices/cartitemSlice"
// import wishlistReducer from "./Slices/wishlistSlice"
 
const store = configureStore({
  reducer: {
    
    cart:cartItemReducer,
   
  }
});

export default store;
