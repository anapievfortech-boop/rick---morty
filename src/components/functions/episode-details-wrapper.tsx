import axios from "axios";
import EpisodeDetails from "../episode/episode-detail";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}

async function episodeFetch(id: string | undefined) {
  const { data } = await axios.get<Episode>(
    `https://rickandmortyapi.com/api/episode/${id}`,
  );

  return data;
}

const EpisodeDetailsWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: episode,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["episode", id],
    queryFn: () => episodeFetch(id),
  });

  if (isLoading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

  if (!episode) {
    return <h2>Эпизод не найден!</h2>;
  }

  return (
    <EpisodeDetails
      id={episode.id}
      name={episode.name}
      air_date={episode.air_date}
      episode={episode.episode}
      characters={episode.characters}
    />
  );
};

export default EpisodeDetailsWrapper;
