import CharDetails from "../character/character-detail";
import { useParams } from "react-router-dom";
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
  episode: string[];
}

async function characterFetch(id: string | undefined): Promise<Character> {
  if (!id) {
    throw new Error("Character ID is undefined");
  }

  const { data } = await axios.get<Character>(
    `https://rickandmortyapi.com/api/character/${id}`,
  );

  return data;
}

const CharacterDetailsWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => characterFetch(id),
  });

  if (isLoading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

  if (!character) {
    return <h2>Персонаж не найден!</h2>;
  }

  return (
    <CharDetails
      id={character.id}
      image={character.image}
      name={character.name}
      species={character.species}
      gender={character.gender}
      status={character.status}
      origin={character.origin}
      type={character.type}
      location={character.location}
      episode={character.episode}
    />
  );
};

export default CharacterDetailsWrapper;
