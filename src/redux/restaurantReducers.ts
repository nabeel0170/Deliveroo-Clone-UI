import { createAsyncThunk } from "@reduxjs/toolkit";
import { RestauranDetailsType } from "./slices/restaurantSlice";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchRestaurantDetails = createAsyncThunk(
  "menu/fetchRestaurantDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/restaurant/restaurantDetails",
        {
          headers: {
            "api-key": apiKey,
          },
        },
      );
      // Return data if response is successful
      return response.data as RestauranDetailsType;
    } catch (error) {
      const errorMessage =
        (error as Error).message || "Cannot fetch data right now";
      return rejectWithValue(errorMessage);
    }
  },
);
