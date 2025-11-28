import type { FC } from "react";
import { Link } from "react-router-dom";
import arroBack from "../../assets/arrow_back_24px.svg";
import CharacterCard from "../character/character-card";
import type { Character } from "../../types";
import { useEpisodeDetailQuery } from "../../hooks/use-episode-detail-query";

const EpisodeDetails: FC = () => {
  const { episodeData, residentList, isLoading, isError } =
    useEpisodeDetailQuery();

  if (isLoading) {
    return (
      <div className="card-details-alert">
        Идет загрузка эпизода, подождите!
      </div>
    );
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

  const { name, air_date, episode: episodeCode } = episodeData!;

  return (
    <>
      <div className="top-details wrapper">
        <Link className="link-back wrapper" to="/episodes">
          <button className="go-back-button">
            <img
              src={arroBack}
              alt="button-back"
              style={{ marginRight: 8, height: 24 }}
            />
            <p className="button-wrapper">GO BACK</p>
          </button>
        </Link>
        <div className="main-info">
          <h2 className="episode-header">{name}</h2>
        </div>
      </div>
      <div className="location-description wrapper">
        <div className="type-description">
          <h3 className="location-type">Episode</h3>
          <p className="location-description-low">{episodeCode}</p>
        </div>
        <div className="dimension-description">
          <h3 className="location-dimension">Date</h3>
          <p className="location-description-low">{air_date}</p>
        </div>
      </div>
      <div className="wrapper">
        <h3 className="Heading">Cast</h3>
        <div className="character-list">
          {residentList?.map((character: Character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              species={character.species}
              gender={character.gender}
              status={character.status}
              origin={character.origin}
              type={character.type}
              location={character.location}
              episode={character.episode}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EpisodeDetails;
