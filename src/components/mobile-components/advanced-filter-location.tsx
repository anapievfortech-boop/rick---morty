import { useState } from "react";
import SelectFilterLocation from "../location/select-filter-location";
import type { LocationFilterSelectProps } from "../../types";
import styles from "../character.module.css";

interface ModalFilterLocationProps extends LocationFilterSelectProps {
  onClick?: () => void;
}

const AdvencedFilterLocation = ({
  selectType,
  selectDimension,
  setSelectType,
  setSelectDimension,
}: ModalFilterLocationProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOnClick = () => setShowModal(!showModal);

  return (
    <>
      <button
        type="button"
        className="advenced-filter-button"
        onClick={() => setShowModal(!showModal)}
      >
        advensed filter
      </button>
      {showModal && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-window"]}>
            <h2 className={styles["modal-window-header"]}>Filters</h2>
            <SelectFilterLocation
              selectType={selectType}
              selectDimension={selectDimension}
              setSelectType={setSelectType}
              setSelectDimension={setSelectDimension}
            />
            <button
              type="button"
              className={styles["modal-apply-button"]}
              onClick={handleOnClick}
            >
              APPLY
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvencedFilterLocation;
