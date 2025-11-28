import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./characters/characters-slice";
import locationsReduser from "./locations/locations-slice";
import episodesReduser from "./episodes/episodes-slice";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    locations: locationsReduser,
    episodes: episodesReduser,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
