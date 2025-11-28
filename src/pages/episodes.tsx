import logoEpisodes from "../assets/rick-and-morty-episodes.jpg";
import EpisodesCard from "../components/episode/episode-card";
import LoadMore from "../components/load-button/load-more";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  selectEpisodestate,
  fetchEpisodesPage,
} from "../store/episodes/episodes-slice";
import type { AppDispatch } from "../store/store";
import type { Episode } from "../types";

export default function Episodes() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: allEpisodes,
    filters,
    isLoading,
    isError,
    hasNextPage,
  } = useSelector(selectEpisodestate);
  const [searchInput, setSearchInput] = useState(filters.searchEpisode);
  const filteredSearchEpisode = useMemo(() => {
    return allEpisodes.filter((episode) => {
      const matchesName = episode.name
        .toLowerCase()
        .includes(filters.searchEpisode.toLowerCase());
      const matchesEpisode = episode.episode
        .toLowerCase()
        .includes(filters.searchEpisode.toLowerCase());
      return matchesName || matchesEpisode;
    });
  }, [filters, allEpisodes]);

  useEffect(() => {
    if (allEpisodes.length === 0 && !isLoading && hasNextPage) {
      dispatch(fetchEpisodesPage());
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      dispatch(fetchEpisodesPage());
    }
  };

  const handleFilterChange = (
    filterName: keyof typeof filters,
    value: string,
  ) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    handleFilterChange("searchEpisode", value);
  };

  if (isLoading && allEpisodes.length === 0) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

  return (
      <div className="wrapper episodes">
        <img src={logoEpisodes} alt="logo-episodes" className="logo-episodes" />
        <div className="form-list">
          <form action="" className="form">
            <div style={{ position: "relative" }}>
              <a className="search-logo" href="#" />
              <input
                type="text"
                className="form-input episodes-input"
                placeholder="Filter by name or episode (ex. S01 or S01E02)"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
          </form>
        </div>
        <ul className="episode-cards wrapper">
          {filteredSearchEpisode.map((episode: Episode) => (
            <EpisodesCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              air_date={episode.air_date}
              episode={episode.episode}
              characters={episode.characters}
            />
          ))}
        </ul>
        <LoadMore
          onClick={handleLoadMore}
          disabled={!hasNextPage || isLoading}
        />
      </div>
  );
}
