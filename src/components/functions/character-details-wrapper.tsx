import CharDetails from "../character/character-detail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  origin: {name: string, url: string};
  type: string;
  location: {name: string, url: string};
  episode: any;
  url: string;
  created: string;
}

const CharacterDetailsWrapper = () => {
  const { id } = useParams<{id: string}>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const characterGet = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
        );
        const data = await response.json();
        setCharacter(data);
      } catch (err: any) {
        setError(err.message);
        console.log("Ошибка", err);
      } finally {
        setLoading(false);
      }
    };

    characterGet();
  }, [id]);

  if (loading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (error) {
    return <div>Произошла ошибка!</div>;
  }

  // const character = characterData.find(
  //   (character) => character.id === Number(id),
  // );

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
    />
  );
};

export default CharacterDetailsWrapper;
