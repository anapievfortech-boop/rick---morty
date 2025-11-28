import Header from "./components/header";
import Characters from "./pages/characters";
import Locations from "./pages/locations";
import Episodes from "./pages/episodes";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import CharDetails from "./components/character/character-detail";
import EpisodeDetails from "./components/episode/episode-detail";
import LocationDetails from "./components/location/location-detail";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Characters />} />

          <Route path="/locations" element={<Locations />} />

          <Route path="/episodes" element={<Episodes />} />

          <Route path="/location/:id" element={<LocationDetails />} />

          <Route path="/episodes/:id" element={<EpisodeDetails />} />

          <Route path="/character/:id" element={<CharDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
