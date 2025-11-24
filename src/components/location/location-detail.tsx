import type { FC } from "react";
import { Link } from "react-router-dom";
import arroBack from "../../assets/arrow_back_24px.svg";
import CharacterCard from "../character/character-card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: Array<string>;
}

interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  gender?: string;
  status?: string;
  origin?: { name: string; url: string };
  type?: string;
  location?: { name: string; url: string };
  episode?: any;
  url?: string;
  created?: string;
}

async function residentFetch(residentUrls: string[]): Promise<Character[]> {
  const requests = residentUrls.map((url) => axios.get<Character>(url));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
}

const LocationDetails: FC<Location> = ({
  id,
  name,
  dimension,
  type,
  residents,
}) => {
  const {
    data: residentList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["locationResidents", id],
    queryFn: () => residentFetch(residents),
  });

  if (isLoading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

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
          {residentList?.map((character: Character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              species={character.species}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default LocationDetails;
