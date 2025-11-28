import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Character, CharacterFilters, CharactersState } from "../../types";
import { characterFetch } from "../../api";
import type { RootState } from "../store";

const initialState: CharactersState = {
  data: [],
  filters: {
    searchCharacter: "",
    selectGender: "",
    selectStatus: "",
    selectSpecies: "",
  },
  currentPage: 1,
  isLoading: false,
  isError: false,
  hasNextPage: true,
};

export const fetchCharactersPage = createAsyncThunk(
  "characters/fetchCharactersPage",
  async (_, { getState }) => {
    const response = await characterFetch(
      (getState() as RootState).characters.currentPage,
    );
    return response as Character[];
  },
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<CharacterFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersPage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchCharactersPage.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.isLoading = false;
          state.data.push(...action.payload);
          state.currentPage += 1;
          if (state.currentPage > 42) {
            state.hasNextPage = false;
          }
        },
      )
      .addCase(fetchCharactersPage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setFilters, resetState } = charactersSlice.actions;

export const selectAllCharacters = (state: RootState) => state.characters.data;
export const selectCharacterState = (state: RootState) => state.characters;
export const selectFilters = (state: RootState) => state.characters.filters;

export default charactersSlice.reducer;
