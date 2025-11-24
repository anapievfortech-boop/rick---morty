import axios from "axios";
import LocationDetails from "../location/location-detail";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: Array<string>;
}

async function locationFetch(id: string | undefined) {
  const { data } = await axios.get<Location>(`https://rickandmortyapi.com/api/location/${id}`);

  return data;
}

const LocationDetailsWrapper = () => {
  const { id } = useParams<{id: string}>();
  const { data: location, isLoading, isError } = useQuery({
    queryKey: ["location", id],
    queryFn: () => locationFetch(id),
  });

    if (isLoading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

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
    />
  );
};

export default LocationDetailsWrapper;
