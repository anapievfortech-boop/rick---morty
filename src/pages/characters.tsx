import CharacterCard from "../components/character/character-card";
import LoadMore from "../components/load-button/load-more";
import type { JSX } from "react";
import { characterData } from "../components/character/character-data";
import Logo from "../assets/Rick-and-Morty-logo.svg";
import styles from "../components/character.module.css";

export default function Characters(): JSX.Element {
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

            <select className={styles["form-select"]} name="Species" id="">
              <option value="Species">Species</option>
            </select>
            <select className={styles["form-select"]} name="Species" id="">
              <option value="Gender">Gender</option>
            </select>
            <select className={styles["form-select"]} name="Species" id="">
              <option value="Status">Status</option>
            </select>
          </form>
          <ul className={styles["character-list"]}>
            {characterData.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                img={character.img}
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
