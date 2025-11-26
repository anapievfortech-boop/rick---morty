import type { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./episode-card.module.css";
import { type Episode } from "../../types";

const EpisodesCard: FC<Episode> = ({ id, name, air_date, episode }) => (
  <Link to={`/episodes/${id}`}>
    <li className={styles["episode-card"]}>
      <h2 className={styles["episode-name"]}>{name}</h2>
      <p className={styles["episode-air-date"]}>{air_date}</p>
      <p className={styles["episode-number"]}>{episode}</p>
    </li>
  </Link>
);

export default EpisodesCard;
