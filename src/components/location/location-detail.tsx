import type { FC } from "react";
import { Link } from "react-router-dom";
import arroBack from "../../assets/arrow_back_24px.svg";
import CharacterCard from "../character/character-card";
import type { Character } from "../../types";
import { useLocationDetailQuery } from "../../hooks/use-location-detail-query";

const LocationDetails: FC = () => {
  const { locationData, residentList, isError, isLoading } =
    useLocationDetailQuery();

  if (isLoading) {
    return (
      <div className="card-details-alert">
        Идет загрузка локации, подождите!
      </div>
    );
  }

  if (isError || !locationData) {
    return <div>Произошла ошибка!</div>;
  }

  const { name, dimension, type } = locationData!;

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
      <div className="wrapper location-character-cards">
        <h3 className="Heading">Residents</h3>
        <ul className="character-list">
          {residentList?.length !== 0 ? (
            residentList?.map((character: Character) => (
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
            ))
          ) : (
            <li className="card-list-empty-alert">
              The character is not found.
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default LocationDetails;
