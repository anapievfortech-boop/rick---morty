
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface EpisodeFilters {
  searchEpisode: string;
}

export interface EpisodeState {
  data: Episode[];
  filters: EpisodeFilters;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  currentPage: number;
}
