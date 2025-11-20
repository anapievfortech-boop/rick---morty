import './App.css'
import Header from "./components/header";
import Characters from './components/characters'
import Locations from './components/locations'
import Episodes from './components/episodex'
import Footer from './components/footer';
import { Routes, Route, useParams } from 'react-router-dom';
import CharDetails from './components/cahr-detail';
import { cardData } from './components/card/cardData';

function CharacterDetailsWrapper() {
  const { id } = useParams(); // 1. Получаем ID из URL (например, '1', '2')

  // 2. Находим нужный объект в массиве по ID
  const character = cardData.find(char => char.id === Number(id));

  if (!character) {
    return <h2>Персонаж не найден!</h2>;
  }

  // 3. Передаем найденные данные в CharDetails как пропсы
  return (
    <CharDetails
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


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Characters />} /> 

        <Route path='/locations' element={<Locations />} />
        
        <Route path='/episodes' element={<Episodes />} />

        <Route path='/char/:id' element={<CharacterDetailsWrapper />} />

      </Routes>

      <Footer />


    </>
  )
}

export default App
