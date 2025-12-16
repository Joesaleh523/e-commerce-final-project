// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   products: [],
//   isLoading: false,
// };

// export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
//   const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
//   return data.data;
// });

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getAllProducts.fulfilled, (state, action) => {
//       state.products = action.payload;
//       state.isLoading = false;
//     });
//     builder.addCase(getAllProducts.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(getAllProducts.rejected, (state, action) => {
//       state.isLoading = false;
//       console.log(action.payload);
//     });
//   },
// });

// export const productReducer = productSlice.reducer;
