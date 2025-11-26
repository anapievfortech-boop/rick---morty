export interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: string[];
}

export interface LocationFilterSelectProps {
  searchSpeciesCharacter: string;
  searchGenderCharacter: string;
  searchStatusCharacter: string;
  setSearchGenderCharacter: (value: string) => void;
  setSearchStatusCharacter: (value: string) => void;
  setSearchSpeciesCharacter: (value: string) => void;
}
