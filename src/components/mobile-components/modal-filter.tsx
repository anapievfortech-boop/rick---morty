import styles from "../character.module.css";
import type { FilterSelectProps } from "../../types";

interface ModalFilterProps extends FilterSelectProps {
  onClick: () => void;
  }


const ModalFilter = ({
  selectSpecies,
  selectGender,
  selectStatus,
  setSelectGender,
  setSelectStatus,
  setSelectSpecies,
  onClick,
}: ModalFilterProps) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-window"]}>
        <h2 className="modal-window-header">Filters</h2>
        <select
          className={styles["form-select-modal"]}
          name="Species"
          id="Species"
          value={selectSpecies}
          onChange={(e) => setSelectSpecies(e.target.value)}
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
          className={styles["form-select-modal"]}
          name="Gender"
          id="Gender"
          value={selectGender}
          onChange={(e) => setSelectGender(e.target.value)}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="Unknown">Unknown</option>
        </select>
        <select
          className={styles["form-select-modal"]}
          name="Status"
          id="Status"
          value={selectStatus}
          onChange={(e) => setSelectStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Dead">Dead</option>
          <option value="Alive">Alive</option>
          <option value="Unknown">Unknown</option>
        </select>
        <button type="button" className={styles["modal-apply-button"]} onClick={onClick}>
          APPLY
        </button>
      </div>
    </div>
  );
};

export default ModalFilter;
