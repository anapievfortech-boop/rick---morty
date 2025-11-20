import logoEpisodes from "../assets/rick-and-morty-episodes.svg";
import { episodeData } from "../components/episode/episode-data";
import EpisodesCard from "../components/episode/episode-card";
import LoadMore from "../components/load-button/load-more";

export default function Episodes() {
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
              />
            </div>
          </form>
        </div>
        <ul className="episode-cards wrapper">
          {episodeData.map((episode) => (
            <EpisodesCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              air_date={episode.air_date}
              episode={episode.episode}
              characters={episode.character}
              url={episode.url}
              created={episode.created}
            />
          ))}
        </ul>
        <LoadMore />
      </div>
    </>
  );
}
