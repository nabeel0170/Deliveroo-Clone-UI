import { createAsyncThunk } from "@reduxjs/toolkit";
import { RestauranDetailsState } from "./slices/menuSlice";
import { faker } from "@faker-js/faker";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const randomHour = faker.number.int({ min: 1, max: 12 });
const randomMinute = faker.number.int({ min: 0, max: 59 });

export const fetchRestaurantDetails = createAsyncThunk(
  "menu/fetchRestaurantDetails",
  async (): Promise<RestauranDetailsState> => {
    try {
      await delay(1000);
      const response = await fetch("menu/fetchRestaurantDetails", {
        method: "GET",
      });
      if (response.ok) {
        const data: RestauranDetailsState = {
          details: {
            itemImgSrc: "./logo/image-1.webp",
            restaurantName: `${faker.company.name()}`,
            foodTypes: ["Chicken", "Salads", "Healthy"],
            distance: faker.number.int({ min: 1, max: 5 }),
            openTime: [randomHour, randomMinute],
            minOrderAmount: faker.number.int({ min: 7, max: 14 }),
            minDeliveryFee: faker.number.int({ min: 1, max: 5 }),
          },
        };
        return data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      throw new Error("Cannot fetch data right now");
    }
  }
);
