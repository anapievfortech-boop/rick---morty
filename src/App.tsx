// import "./App.css";
import Header from "./components/header";
import Characters from "./pages/characters";
import Locations from "./pages/locations";
import Episodes from "./pages/episodes";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
// import CharacterDetailsWrapper from "./components/functions/character-details-wrapper";
import EpisodeDetailsWrapper from "./components/functions/episode-details-wrapper";
import LocationDetailsWrapper from "./components/functions/location-details-wrapper";
import CharDetails from "./components/character/character-detail";

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

          <Route path="/character/:id" element={<CharDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
