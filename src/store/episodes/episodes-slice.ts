import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Episode, EpisodeFilters, EpisodeState } from "../../types";
import { episodeFetch } from "../../api";
import type { RootState } from "../store";

const initialState: EpisodeState = {
  data: [],
  filters: {
    searchEpisode: "",
  },
  currentPage: 1,
  isLoading: false,
  isError: false,
  hasNextPage: true,
};

export const fetchEpisodesPage = createAsyncThunk(
  "episodes/fetchEpisodesPage",
  async (_, { getState }) => {
    const response = await episodeFetch(
      (getState() as RootState).episodes.currentPage,
    );
    return response as Episode[];
  },
);

export const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<EpisodeFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodesPage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchEpisodesPage.fulfilled,
        (state, action: PayloadAction<Episode[]>) => {
          state.isLoading = false;
          state.data.push(...action.payload);
          state.currentPage += 1;
          if (state.currentPage > 3) {
            state.hasNextPage = false;
          }
        },
      )
      .addCase(fetchEpisodesPage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setFilters, resetState } = episodesSlice.actions;

export const selectAllEpisodes = (state: RootState) => state.episodes.data;
export const selectEpisodestate = (state: RootState) => state.episodes;
export const selectFilters = (state: RootState) => state.episodes.filters;

export default episodesSlice.reducer;
