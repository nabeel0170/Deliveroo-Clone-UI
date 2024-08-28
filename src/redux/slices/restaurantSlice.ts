import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchRestaurantDetails } from "../restaurantReducers";

export interface RestauranDetailsType {
  details: {
    itemImgSrc: string;
    restaurantName: string;
    foodTypes: string[];
    distance: number | null;
    openTime: number[] | null;
    minOrderAmount: number | null;
    minDeliveryFee: number | null;
  };
}

export const RestauranDetailsInitialState: RestauranDetailsType = {
  details: {
    itemImgSrc: "",
    restaurantName: "",
    foodTypes: [],
    distance: null,
    openTime: null,
    minOrderAmount: null,
    minDeliveryFee: null,
  },
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: RestauranDetailsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantDetails.fulfilled, (state, action: PayloadAction<RestauranDetailsType>) => {
      state.details = action.payload.details;
    });
  },
});

export default menuSlice.reducer;
