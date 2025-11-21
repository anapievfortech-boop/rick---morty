import { episodeData } from "../episode/episode-data"; 
import EpisodeDetails from "../episode/episode-detail";
import { useParams } from "react-router-dom";

function EpisodeDetailsWrapper() {
  const { id } = useParams();

  const episode = episodeData.find((episode) => episode.id === Number(id));

  if (!episode) {
    return <h2>Эпизод не найден!</h2>;
  }

  return (
    <EpisodeDetails
      id={episode.id}
      name={episode.name}
      air_date={episode.air_date}
      episode={episode.episode}
      characters={episode.character}
      url={episode.url}
      created={episode.created}
    />
  );
}

export default EpisodeDetailsWrapper;