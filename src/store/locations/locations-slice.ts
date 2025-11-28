import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Location, LocationFilters, LocationState } from "../../types";
import { locationFetch } from "../../api";
import type { RootState } from "../store";

const initialState: LocationState = {
  data: [],
  filters: {
    searchLocation: "",
    selectType: "",
    selectDimension: "",
  },
  currentPage: 1,
  isLoading: false,
  isError: false,
  hasNextPage: true,
};

export const fetchLocationsPage = createAsyncThunk(
  "locations/fetchLocationsPage",
  async (_, { getState }) => {
    const response = await locationFetch(
      (getState() as RootState).locations.currentPage,
    );
    return response as Location[];
  },
);

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<LocationFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsPage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchLocationsPage.fulfilled,
        (state, action: PayloadAction<Location[]>) => {
          state.isLoading = false;
          state.data.push(...action.payload);
          state.currentPage += 1;
          if (state.currentPage > 7) {
            state.hasNextPage = false;
          }
        },
      )
      .addCase(fetchLocationsPage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setFilters, resetState } = locationsSlice.actions;

export const selectAllLocations = (state: RootState) => state.locations.data;
export const selectLocationstate = (state: RootState) => state.locations;
export const selectFilters = (state: RootState) => state.locations.filters;

export default locationsSlice.reducer;
