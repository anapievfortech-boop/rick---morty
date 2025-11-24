import { type FC } from "react";
import "../../App.css";
import arroBack from "../../assets/arrow_back_24px.svg";
import { Link } from "react-router-dom";
import InformationListItem from "./information-list";
import EpisodesList from "./episodes-list";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  origin: { name: string; url: string };
  type: string;
  location: { name: string; url: string };
  episode: Array<string>;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}

async function detailsEpisodeFetch(episodeUrl: string[]): Promise<Episode[]> {
  const request = episodeUrl.map((url) => axios.get<Episode>(url));
  const response = await Promise.all(request);
  return response.map((response) => response.data);
}

const CharDetails: FC<Character> = ({
  name,
  image,
  id,
  species,
  status,
  gender,
  type,
  location,
  origin,
  episode,
}) => {
  const {
    data: episodeList,
    isLoading,
    isError,
  } = useQuery<Episode[]>({
    queryKey: ["episodeList", id],
    queryFn: () => detailsEpisodeFetch(episode),
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="top-details wrapper">
          <Link className="link-back" to="/">
            <button className="go-back-button wrapper">
              <img
                src={arroBack}
                alt="button-back"
                style={{ marginRight: 8, height: 24 }}
              />
              <p className="button-wrapper">GO BACK</p>
            </button>
          </Link>
          <div className="main-info">
            <img className="main-img" src={image} alt={name} />
            <p className="main-wrapper">{name}</p>
          </div>
        </div>
        <div className="bottom-details wrapper">
          <div className="information">
            <h3 className="Heading">Information</h3>
            <ul className="details-list">
              <InformationListItem
                key={id}
                species={species}
                gender={gender}
                status={status}
                origin={origin}
                type={type}
                location={location}
              />
            </ul>
          </div>
          <div className="episodes">
            <h3 className="Heading">Episodes</h3>
            <ul className="details-list-episodes">
              {episodeList?.slice(0, 4).map((episodeItem: Episode) => (
                <EpisodesList
                  key={episodeItem.id}
                  id={episodeItem.id}
                  episode={episodeItem.episode}
                  name={episodeItem.name}
                  air_date={episodeItem.air_date}
                  characters={episodeItem.characters}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharDetails;
