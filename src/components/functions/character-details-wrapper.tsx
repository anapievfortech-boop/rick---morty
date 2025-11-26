// import CharDetails from "../character/character-detail";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { characterDetailFetch } from "../../api";

// const CharacterDetailsWrapper = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: character, isLoading, isError } = useQuery({
//     queryKey: ["character", id],
//     queryFn: () => characterDetailFetch(id),
//   });

//   if (isLoading) {
//     return <div className="card-details-alert">Идет загрузка, подождите!</div>;
//   }

//   if (isError) {
//     return <div>Произошла ошибка!</div>;
//   }

//   if (!character) {
//     return <h2>Персонаж не найден!</h2>;
//   }

//   return (
//     <CharDetails
//       id={character.id}
//       image={character.image}
//       name={character.name}
//       species={character.species}
//       gender={character.gender}
//       status={character.status}
//       origin={character.origin}
//       type={character.type}
//       location={character.location}
//       episode={character.episode}
//     />
//   );
// };

// export default CharacterDetailsWrapper;
