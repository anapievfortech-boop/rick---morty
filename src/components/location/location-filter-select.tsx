import styles from "../character.module.css";
import type { LocationFilterSelectProps } from "../../types";

const LocationFilterSelect = ({
  searchSpeciesCharacter,
  searchGenderCharacter,
  searchStatusCharacter,
  setSearchGenderCharacter,
  setSearchStatusCharacter,
  setSearchSpeciesCharacter,
}: LocationFilterSelectProps) => {
  return (
    <>
      <select
        className={styles["form-select"]}
        name="Species"
        id="Species"
        value={searchSpeciesCharacter}
        onChange={(e) => setSearchSpeciesCharacter(e.target.value)}
      >
        <option value="">Species</option>
        <option value="Human">Human</option>
        <option value="Humanoid">Humanoid</option>
        <option value="Alien">Alien</option>
        <option value="Animal">Animal</option>
        <option value="Robot">Robot</option>
        <option value="Cronenberg">Cronenberg</option>
        <option value="Mythological Creature">Mythological Creature</option>
        <option value="Disease">Disease</option>
        <option value="Unknown">Unknown</option>
        <option value="Poopybutthole">Poopybutthole</option>
      </select>
      <select
        className={styles["form-select"]}
        name="Gender"
        id="Gender"
        value={searchGenderCharacter}
        onChange={(e) => setSearchGenderCharacter(e.target.value)}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="Unknown">Unknown</option>
      </select>
      <select
        className={styles["form-select"]}
        name="Status"
        id="Status"
        value={searchStatusCharacter}
        onChange={(e) => setSearchStatusCharacter(e.target.value)}
      >
        <option value="">Status</option>
        <option value="Dead">Dead</option>
        <option value="Alive">Alive</option>
        <option value="Unknown">Unknown</option>
      </select>
    </>
  );
};

export default LocationFilterSelect;
