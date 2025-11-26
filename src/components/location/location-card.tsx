import type { FC } from "react";
import styles from "./location-card.module.css";
import { Link } from "react-router-dom";
import type { Location } from "../../types";

const LocationCard: FC<Location> = ({ id, name, dimension, type }) => (
  <Link to={`/location/${id}`}>
    <li className={styles["location-card"]}>
      <h2 className={styles["location-name"]}>
        {name} {dimension}
      </h2>
      <p className={styles["location-type"]}>{type}</p>
    </li>
  </Link>
);

export default LocationCard;
