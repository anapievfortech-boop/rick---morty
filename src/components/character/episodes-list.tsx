import { type FC } from "react";

interface IProps {
  id?: number;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: string[];
  url?: string;
  created?: string;
}

const EpisodesList: FC<IProps> = ({ name, air_date, episode }) => {
  return (
    <>
      <li className="list-item-episodes">
        <p className="list-chapter">{episode}</p>
        <p className="list-descr">{name}</p>
        <p className="list-descr-low">{air_date}</p>
      </li>
    </>
  );
};

export default EpisodesList;
