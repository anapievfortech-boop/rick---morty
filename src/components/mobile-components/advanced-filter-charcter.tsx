import { useState, type FC } from "react";
import ModalFilter from "./modal-filter";
import type { FilterSelectProps } from "../../types";

const AdvencedFilter: FC<FilterSelectProps> = (props) => {
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
      {showModal && <ModalFilter {...props} onClick={handleOnClick} />}
    </>
  );
};

export default AdvencedFilter;
