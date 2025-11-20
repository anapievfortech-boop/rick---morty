import { Link } from 'react-router-dom';
import styles from './character.module.css'
import { type FC } from 'react'

interface CardProps {
    id: number,
    img?: string,
    name?: string,
    species?: string,
}

const CharacterCard: FC<CardProps> = ({ id, img, name, species }) => {
    return (
        <Link to={`/char/${id}`}>
            <li className={styles["character-card"]}>

                <img className={styles["character-card-img"]} src={img} alt={name} />
                <h3 className={styles["char-name"]}>
                    {name}
                </h3>
                <p className={styles["char-desr"]}>
                    {species}
                </p>
            </li>
        </Link>
    )
}

export default CharacterCard;