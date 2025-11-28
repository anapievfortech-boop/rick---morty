export interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: string[];
}

export interface LocationFilterSelectProps {
  selectType: string;
  selectDimension: string;
  setSelectType: (value: string) => void;
  setSelectDimension: (value: string) => void;
}

export interface LocationFilters {
  searchLocation: string;
  selectType: string;
  selectDimension: string;
}

export interface LocationState {
  data: Location[];
  filters: LocationFilters;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  currentPage: number;
}
