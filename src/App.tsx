import "./App.css";
import Header from "./components/header";
import Characters from "./pages/characters";
import Locations from "./pages/locations";
import Episodes from "./pages/episodes";
import Footer from "./components/footer";
import { Routes, Route, useParams } from "react-router-dom";
import CharDetails from "./components/character-detail";
import { characterData } from "./components/character/character-data";
import { locationData } from "./components/location/location-data";
import LocationDetails from "./components/location/location-detail";
import { episodeData } from "./components/episode/episode-data";
import EpisodeDetails from "./components/episode/episode-detail";

function CharacterDetailsWrapper() {
  const { id } = useParams();

  const character = characterData.find(
    (character) => character.id === Number(id),
  );

  if (!character) {
    return <h2>Персонаж не найден!</h2>;
  }

  return (
    <CharDetails
      id={character.id}
      img={character.img}
      name={character.name}
      species={character.species}
      gender={character.gender}
      status={character.status}
      origin={character.origin}
      type={character.type}
      location={character.location}
    />
  );
}

function LocationDetailsWrapper() {
  const { id } = useParams();

  const location = locationData.find((location) => location.id === Number(id));

  if (!location) {
    return <h2>Локация не найдена!</h2>;
  }

  return (
    <LocationDetails
      id={location.id}
      name={location.name}
      dimension={location.dimension}
      type={location.type}
      residents={location.residents}
      url={location.url}
      created={location.created}
    />
  );
}

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

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Characters />} />

          <Route path="/locations" element={<Locations />} />

          <Route path="/episodes" element={<Episodes />} />

          <Route path="/location/:id" element={<LocationDetailsWrapper />} />

          <Route path="/episodes/:id" element={<EpisodeDetailsWrapper />} />

          <Route path="/character/:id" element={<CharacterDetailsWrapper />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
