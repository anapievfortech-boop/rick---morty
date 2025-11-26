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