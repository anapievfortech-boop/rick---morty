import { locationData } from "../location/location-data";
import LocationDetails from "../location/location-detail";
import { useParams } from "react-router-dom";

const LocationDetailsWrapper = () => {
  const { id } = useParams();

  const location = locationData.find((location) => location.id === Number(id));

  if (!location) {
    return <h2>Локация не найдена!</h2>;
  }

  return (
    <LocationDetails
      id={location.id}
      name={location.name}
      dimension={location.dimension}
      type={location.type}
      residents={location.residents}
      url={location.url}
      created={location.created}
    />
  );
}

export default LocationDetailsWrapper;