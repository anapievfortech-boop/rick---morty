import styles from "../character.module.css";
import type { FilterSelectProps } from "../../types";
import Select from "../select-option";
import { selectOptions } from "../../data/select-options";

const SelectFilter = ({
  selectSpecies,
  selectGender,
  selectStatus,
  setSelectGender,
  setSelectStatus,
  setSelectSpecies,
}: FilterSelectProps) => {
  return (
    <>
      <Select
        className={styles["form-select"]}
        name="Species"
        id="Species"
        value={selectSpecies}
        onChange={setSelectSpecies}
        options={selectOptions.species}
      />
      <Select
        className={styles["form-select"]}
        name="Gender"
        id="Gender"
        value={selectGender}
        onChange={setSelectGender}
        options={selectOptions.gender}
      />
      <Select
        className={styles["form-select"]}
        name="Status"
        id="Status"
        value={selectStatus}
        onChange={setSelectStatus}
        options={selectOptions.status}
      />
    </>
  );
};

export default SelectFilter;
