import type { FC } from "react";
import styles from "./location-card.module.css";
import { Link } from "react-router-dom";

interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents?: Array<string>;
}

const LocationCard: FC<Location> = ({ id, name, dimension, type }) => {
  return (
    <>
      <Link to={`/location/${id}`}>
        <li className={styles["location-card"]}>
          <h2 className={styles["location-name"]}>
            {name} {dimension}
          </h2>
          <p className={styles["location-type"]}>{type}</p>
        </li>
      </Link>
    </>
  );
};
export default LocationCard;
