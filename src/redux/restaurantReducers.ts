import { createAsyncThunk } from "@reduxjs/toolkit";
import { RestauranDetailsState } from "./slices/restaurantSlice";
import { faker } from "@faker-js/faker";
import axios from "axios";
const apiKey = "your-secret-api-key";

export const fetchRestaurantDetails = createAsyncThunk(
  "menu/fetchRestaurantDetails",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get("http://localhost:8000/api/restaurantDetails", {
        headers: {
          "api-key": apiKey,
        },
      });
      // Return data if response is successful
      return response.data as RestauranDetailsState;
    } catch (error) {
      const errorMessage = (error as Error).message || "Cannot fetch data right now";
      return rejectWithValue(errorMessage);
    }
  }
);
