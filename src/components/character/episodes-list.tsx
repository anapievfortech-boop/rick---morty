import { type FC } from "react";
import { Link } from "react-router-dom";
import type { Episode } from "../../types";

const EpisodesList: FC<Episode> = ({ id, name, air_date, episode }) => {
  return (
    <>
      <Link to={`/episodes/${id}`}>
        <li className="list-item-episodes">
          <p className="list-chapter">{episode}</p>
          <p className="list-descr">{name}</p>
          <p className="list-descr-low">{air_date}</p>
        </li>
      </Link>
    </>
  );
};

export default EpisodesList;
