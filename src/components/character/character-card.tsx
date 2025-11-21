import { Link } from "react-router-dom";
import styles from "./character-card.module.css";
import { type FC } from "react";


interface IProps {
  id: number;
  image: string;
  name: string;
  species: string;
}

const CharacterCard: FC<IProps> = ({ id, image, name, species }) => {

  return (
    <Link to={`/character/${id}`}>
      <li className={styles["character-card"]}>
        <img
          className={styles["character-card-img"]}
          src={image}
          alt={name}
        />
        <h3 className={styles["char-name"]}>{name}</h3>
        <p className={styles["char-desr"]}>{species}</p>
      </li>
    </Link>
  );
};

export default CharacterCard;
