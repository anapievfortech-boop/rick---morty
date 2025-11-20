import type { FC } from "react";
import { Link } from "react-router-dom";
import arroBack from "../../assets/arrow_back_24px.svg";
import CharacterCard from "../character/character-card";
import { characterData } from "../character/character-data";

interface IProps {
  id?: number;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: string[];
  url?: string;
  created?: string;
}

const EpisodeDetails: FC<IProps> = ({ name, air_date, episode }) => {
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
          <p className="location-description-low">{episode}</p>
        </div>
        <div className="dimension-description">
          <h3 className="location-dimension">Date</h3>
          <p className="location-description-low">{air_date}</p>
        </div>
      </div>
      <div className="wrapper">
        <h3 className="Heading">Cast</h3>
        <ul className="character-list">
          {characterData.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              img={character.img}
              species={character.species}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default EpisodeDetails;
