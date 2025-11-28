import type { LocationFilterSelectProps } from "../../types";
import Select from "../select-option";
import { selectOptions } from "../../data/select-options";
import styles from "../character.module.css";

const SelectFilterLocation = ({
  selectType,
  selectDimension,
  setSelectType,
  setSelectDimension,
}: LocationFilterSelectProps) => (
  <>
    <Select
      className={styles["form-select-modal"]}
      name="Type"
      id="Type"
      value={selectType}
      onChange={setSelectType}
      options={selectOptions.type}
    />
    <Select
      className={styles["form-select-modal"]}
      name="Dimension"
      id="Dimension"
      value={selectDimension}
      onChange={setSelectDimension}
      options={selectOptions.dimension}
    />
  </>
);

export default SelectFilterLocation;
