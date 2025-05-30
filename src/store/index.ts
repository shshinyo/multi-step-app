import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
