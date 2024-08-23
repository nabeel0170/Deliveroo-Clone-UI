import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchRestaurantDetails } from "../restaurantReducers";

export interface RestauranDetailsState {
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

const initialState: RestauranDetailsState = {
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
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantDetails.fulfilled, (state, action: PayloadAction<RestauranDetailsState>) => {
      state.details = action.payload.details;
    });
  },
});

export default menuSlice.reducer;
