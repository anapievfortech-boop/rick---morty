import logoEpisodes from "../assets/rick-and-morty-episodes.jpg";
import EpisodesCard from "../components/episode/episode-card";
import LoadMore from "../components/load-button/load-more";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Episode } from "../types";
import { episodeFetch } from "../api";

export default function Episodes() {
  const [searchEpisode, setSearchEpisdode] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["episode"],
    queryFn: episodeFetch,
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) => {
      if (lastPageParam >= 3) return;
      return lastPageParam + 1;
    },
  });

  const filteredSearchEpisode =
    data?.pages.map((page) =>
      page.filter((episode) =>
        episode.name.toLowerCase().includes(searchEpisode.toLowerCase()),
      ),
    ) || [];

  if (isLoading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

  return (
    <>
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
                value={searchEpisode}
                onChange={(e) => setSearchEpisdode(e.target.value)}
              />
            </div>
          </form>
        </div>
        <ul className="episode-cards wrapper">
          {filteredSearchEpisode.map((page) =>
            page.map((episode: Episode) => (
              <EpisodesCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                air_date={episode.air_date}
                episode={episode.episode}
                characters={episode.characters}
              />
            )),
          )}
        </ul>
        <LoadMore
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        />
      </div>
    </>
  );
}
