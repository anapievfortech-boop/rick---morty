import { type FC } from "react";
import type { Character } from "../../types";


const InformationListItem: FC<Character> = ({
  species,
  gender,
  status,
  origin,
  type,
  location,
}) => {
  return (
    <>
      <li className="list-item">
        <p className="list-chapter">Gender</p>
        <p className="list-descr">{gender || "Unknown"}</p>
      </li>
      <li className="list-item">
        <p className="list-chapter">Status</p>
        <p className="list-descr">{status || "Unknown"}</p>
      </li>
      <li className="list-item">
        <p className="list-chapter">Specie</p>
        <p className="list-descr">{species || "Unknown"}</p>
      </li>
      <li className="list-item">
        <p className="list-chapter">Origin</p>
        <p className="list-descr">{origin.name || "Unknown"}</p>
      </li>
      <li className="list-item">
        <p className="list-chapter">Type</p>
        <p className="list-descr">{type || "Unknown"}</p>
      </li>
      <li className="list-item">
        <p className="list-chapter">Location</p>
        <p className="list-descr">{location.name || "Unknown"}</p>
      </li>
    </>
  );
};

export default InformationListItem;
