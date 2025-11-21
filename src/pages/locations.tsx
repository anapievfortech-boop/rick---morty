import logoLocations from "../assets/rick-and-morty-locations.svg";
import LoadMore from "../components/load-button/load-more";
import LocationCard from "../components/location/location-card";
import { locationData } from "../components/location/location-data";

export default function Locations() {
  return (
    <div className="wrapper">
      <img
        src={logoLocations}
        alt="logo-locations"
        className="logo-locations"
      />
      <div className="form-list">
        <form action="" className="form">
          <div style={{ position: "relative" }}>
            <a className="search-logo" href="#" />
            <input
              type="text"
              className="form-input locations-input"
              placeholder="Filter by name..."
            />
          </div>
          <select className="form-select hide-on-mobile" name="Type" id="">
            <option value="Type">Type</option>
          </select>
          <select className="form-select hide-on-mobile" name="Dimension" id="">
            <option value="Dimension">Dimension</option>
          </select>
        </form>
      </div>
      <ul className="locations-cards wrapper">
        {locationData.map((location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            dimension={location.dimension}
            type={location.type}
          />
        ))}
      </ul>
      <LoadMore />
    </div>
  );
}
