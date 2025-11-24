import type { FC } from "react";
import { Link } from "react-router-dom";
import arroBack from "../../assets/arrow_back_24px.svg";
import CharacterCard from "../character/character-card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}

interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  gender?: string;
  status?: string;
  origin?: object;
  type?: string;
  location?: object;
  episode?: any;
  url?: string;
  created?: string;
}

async function residentFetch(residentUrls: string[]): Promise<Character[]> {
  const requests = residentUrls.map((url) => axios.get<Character>(url));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
}

const EpisodeDetails: FC<Episode> = ({
  id,
  name,
  air_date,
  episode,
  characters,
}) => {
  const {
    data: residentList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["episodeResidents", id || episode],
    queryFn: () => residentFetch(characters),
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

export default EpisodeDetails;
