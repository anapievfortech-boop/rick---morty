import { type FC } from "react";
import "../../App.css";
import arroBack from "../../assets/arrow_back_24px.svg";
import { Link } from "react-router-dom";
import InformationListItem from "./information-list";
import EpisodesList from "./episodes-list";
import { episodeData } from "../episode/episode-data";

interface IProps {
  id: number;
  image: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  origin: {name: string, url: string};
  type: string;
  location: {name: string, url: string};
  episode?: any;
  url?: string;
  created?: string;
}

const CharDetails: FC<IProps> = ({ name, image, id, species, status, gender, type, location, origin }) => {
  return (
    <>
      <div className="wrapper">
        <div className="top-details wrapper">
          <Link className="link-back" to="/">
            <button className="go-back-button wrapper">
              <img
                src={arroBack}
                alt="button-back"
                style={{ marginRight: 8, height: 24 }}
              />
              <p className="button-wrapper">GO BACK</p>
            </button>
          </Link>
          <div className="main-info">
            <img className="main-img" src={image} alt={name} />
            <p className="main-wrapper">{name}</p>
          </div>
        </div>
        <div className="bottom-details wrapper">
          <div className="information">
            <h3 className="Heading">Information</h3>
            <ul className="details-list">
                <InformationListItem
                  key={id}
                  species={species}
                  gender={gender}
                  status={status}
                  origin={origin}
                  type={type}
                  location={location}
                />
            </ul>
          </div>
          <div className="episodes">
            <h3 className="Heading">Episodes</h3>
            <ul className="details-list-episodes">
              {episodeData.slice(0, 4).map((IProps) => (
                <EpisodesList
                  key={IProps.id}
                  id={IProps.id}
                  episode={IProps.episode}
                  name={IProps.name}
                  air_date={IProps.air_date}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharDetails;
