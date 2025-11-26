import { Link } from "react-router-dom";
import styles from "./character-card.module.css";
import { type FC } from "react";
import { type Character } from "../../types";


const CharacterCard: FC<Character> = ({ id, image, name, species }) => (
  <Link to={`/character/${id}`}>
    <div className={styles["character-card"]}>
      <div>
        <img className={styles["character-card-img"]} src={image} alt={name} />
      </div>
      <h3 className={styles["char-name"]}>{name}</h3>
      <p className={styles["char-desr"]}>{species}</p>
    </div>
  </Link>
);
export default CharacterCard;
