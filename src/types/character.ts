interface LocationOrigin {
  name: string;
  url: string;
}

export interface Character {
  id: number | string | undefined;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationOrigin;
  location: LocationOrigin;
  image: string;
  episode: string[];
}

export interface FilterSelectProps {
  selectSpecies: string;
  selectGender: string;
  selectStatus: string;
  setSelectGender: (value: string) => void;
  setSelectStatus: (value: string) => void;
  setSelectSpecies: (value: string) => void;
}

export interface CharacterFilters {
  searchCharacter: string;
  selectGender: string;
  selectStatus: string;
  selectSpecies: string;
}
export interface CharacterState {
  characters: Character[];
}

export interface CharactersState {
  data: Character[];
  filters: CharacterFilters;
  currentPage: number;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
}
