import type { FC } from "react";
import { Link } from "react-router-dom";
import arroBack from "../../assets/arrow_back_24px.svg";
import { characterData } from "../character/character-data";
import CharacterCard from "../character/character-card";

interface IProps {
  id?: number;
  name?: string;
  dimension?: string;
  type?: string;
  residents?: Array<string>;
  url?: string;
  created?: string;
}

const LocationDetails: FC<IProps> = ({ name, dimension, type }) => {
  return (
    <>
      <div className="top-details wrapper">
        <Link className="link-back wrapper" to="/locations">
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
          <h2 className="location-header">{name}</h2>
        </div>
      </div>

      <div className="location-description wrapper">
        <div className="type-description">
          <h3 className="location-type">Type</h3>
          <p className="location-description-low">{type}</p>
        </div>
        <div className="dimension-description">
          <h3 className="location-dimension">Dimension</h3>
          <p className="location-description-low">{dimension}</p>
        </div>
      </div>
      <div className="wrapper">
        <h3 className="Heading">Residents</h3>
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

export default LocationDetails;
