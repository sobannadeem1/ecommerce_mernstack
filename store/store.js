import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../reducers/categoryreducer";
import productslice from "../reducers/productreducer";
import userSlice from "../reducers/userreducer";
import reviewslice from "../reducers/reviewreducer";
import cartslice from "../reducers/cartreducer";
import orderslice from "../reducers/orderreducer";

const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productslice,
    user: userSlice,
    review: reviewslice,
    cart: cartslice,
    order: orderslice,
  },
});

export default store;
