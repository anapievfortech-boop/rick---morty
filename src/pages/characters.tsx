import CharacterCard from "../components/character/character-card";
import LoadMore from "../components/load-button/load-more";
import type { JSX } from "react";
import Logo from "../assets/Rick-and-Morty-logo.svg";
import styles from "../components/character.module.css";
import { useState, useEffect } from "react";
// import AdvancedFilter from "../components/mobile-components/advanced-filter";

interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  gender?: string;
  status?: string;
  origin?: object;
  type?: string;
  location?: object;
  episode?: any;
  url?: string;
  created?: string;
}

export default function Characters(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const Characterloading = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        setCharacters(data.results || [])
      } catch (err: any) {
        setError(err.message);
        console.log("Ошибка", err);
      } finally {
        setLoading(false);
      }
    };

    Characterloading();
  }, []);

  if (loading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (error) {
    return <div>Произошла ошибка!</div>;
  }

  return (
    <>
      <div className={styles["wrapper"]}>
        <img className={styles["main-logo"]} src={Logo} alt="main-logo" />
        <div className={styles["form-list"]}>
          <form className={styles["form"]} action="">
            <div style={{ position: "relative" }}>
              <a className={styles["search-logo"]} href="#" />
              <input
                className={styles["form-input"]}
                type="text"
                placeholder="Filter by name..."
              />
            </div>
            {/* <AdvancedFilter /> */}
            <select
              className={`${styles["form-select"]} ${styles["hide-on-mobile"]}`}
              name="Species"
              id=""
            >
              <option value="Species">Species</option>
            </select>
            <select
              className={`${styles["form-select"]} ${styles["hide-on-mobile"]}`}
              name="Species"
              id=""
            >
              <option value="Gender">Gender</option>
            </select>
            <select
              className={`${styles["form-select"]} ${styles["hide-on-mobile"]}`}
              name="Species"
              id=""
            >
              <option value="Status">Status</option>
            </select>
          </form>
          <ul className={styles["character-list"]}>
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
              />
            ))}
          </ul>
        </div>
        <LoadMore />
      </div>
    </>
  );
}
