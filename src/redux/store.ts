import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import menuReducer from "./slices/restaurantSlice";
import userReducer from "./slices/userSlice";

export const initializeStore = () => {
  let initialState = {};
  try {
    const savedState = sessionStorage.getItem("Main_State");
    if (savedState) {
      const availableState = JSON.parse(savedState);
      if (availableState.user && availableState.user.expiry && Date.now() > availableState.user.expiry) {
        initialState = { user: { LoggedIn: false, expiry: null } };
      } else {
        initialState = availableState;
      }
    }
  } catch (error) {
    console.log("getError", error);
  }
  const saver: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const stateToSave = store.getState();
    sessionStorage.setItem("Main_State", JSON.stringify(stateToSave));
    return result;
  };
  const rootReducer = combineReducers({
    menu: menuReducer,
    user: userReducer,
  });
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saver),
  });
  return store;
};
export const store = initializeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
