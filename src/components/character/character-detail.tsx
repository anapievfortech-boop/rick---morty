import { type FC } from "react";
import arroBack from "../../assets/arrow_back_24px.svg";
import { Link, useParams } from "react-router-dom";
import InformationListItem from "./information-list";
import EpisodesList from "./episodes-list";
import { useQuery } from "@tanstack/react-query";
import type { Episode } from "../../types";
import { detailsEpisodeFetch, characterDetailFetch } from "../../api";

const CharDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: character,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: () => characterDetailFetch(id),
    enabled: !!id,
  });

  const {
    data: episodeList,
    isLoading: isEpisodesLoading,
    isError: isEpisodesError,
  } = useQuery<Episode[]>({
    queryKey: ["episode-list", character?.id],
    queryFn: () => detailsEpisodeFetch(character!.episode),
    enabled: !!character && !!character.episode, // Условие ТОЛЬКО здесь
  });

  const isLoading = isCharacterLoading || isEpisodesLoading;
  const isError = isCharacterError || isEpisodesError;

  if (isLoading) {
    return <div className="card-details-alert">Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка при загрузке персонажа!</div>;
  }

  if (!character) {
    return <h2>Персонаж не найден!</h2>;
  }

  const {
    name,
    image,
    species,
    status,
    gender,
    type,
    location,
    origin,
    episode,
  } = character;

  return (
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
              key={character.id}
              id={character.id}
              name={name}
              image={image}
              species={species}
              gender={gender}
              status={status}
              origin={origin}
              type={type}
              location={location}
              episode={episode}
            />
          </ul>
        </div>
        <div className="episodes">
          <h3 className="Heading">Episodes</h3>
          <div className="details-list-episodes">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharDetails;
