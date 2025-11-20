// import {cardData} from "./card/cardData"
import { type FC } from "react";
import "../App.css";
import arroBack from "../assets/arrow_back_24px.svg";
import mainImg from "../assets/Rick-img.jpg";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
  img?: string;
  name?: string;
  species?: string;
  gender?: string;
  status?: string;
  origin?: any | object;
  type?: string;
  location?: string;
  episode?: any;
  url?: string;
  created?: string;
}

const CharDetails: FC<IProps> = ({
  name,
  species,
  gender,
  status,
  origin,
  type,
  location,
}) => {
  return (
    <>
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
          <img className="main-img" src={mainImg} alt={name} />
          <p className="main-wrapper">{name}</p>
        </div>
      </div>
      <div className="bottom-details wrapper">
        <div className="information">
          <h3 className="Heading">Information</h3>
          <ul className="details-list">
            <li className="list-item">
              <p className="list-chapter">Gender</p>
              <p className="list-descr">{gender}</p>
            </li>
            <li className="list-item">
              <p className="list-chapter">Status</p>
              <p className="list-descr">{status}</p>
            </li>
            <li className="list-item">
              <p className="list-chapter">Specie</p>
              <p className="list-descr">{species}</p>
            </li>
            <li className="list-item">
              <p className="list-chapter">Origin</p>
              <p className="list-descr">{origin}</p>
            </li>
            <li className="list-item">
              <p className="list-chapter">Type</p>
              <p className="list-descr">{type}</p>
            </li>
            <li className="list-item">
              <p className="list-chapter">Location</p>
              <p className="list-descr">{location}</p>
            </li>
          </ul>
        </div>
        <div className="episodes">
          <h3 className="Heading">Episodes</h3>
          <ul className="details-list-episodes">
            <li className="list-item-episodes">
              <p className="list-chapter">S01E01</p>
              <p className="list-descr">Pilot</p>
              <p className="list-descr-low">December 2, 2013</p>
            </li>
            <li className="list-item-episodes">
              <p className="list-chapter">S01E02</p>
              <p className="list-descr">Lawnmower Dog</p>
              <p className="list-descr-low">December 9, 2013</p>
            </li>
            <li className="list-item-episodes">
              <p className="list-chapter">S01E03</p>
              <p className="list-descr">Anatomy Park</p>
              <p className="list-descr-low">December 16, 2013</p>
            </li>
            <li className="list-item-episodes">
              <p className="list-chapter">S01E04</p>
              <p className="list-descr">M. Night Shaym-Aliens!</p>
              <p className="list-descr-low">January 13, 2014</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CharDetails;
