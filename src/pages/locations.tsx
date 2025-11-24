import logoLocations from "../assets/rick-and-morty-locations.svg";
import LoadMore from "../components/load-button/load-more";
import LocationCard from "../components/location/location-card";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: Array<string>;
}

interface LocationFetchParams {
  pageParam?: number;
}

async function locationFetch({
  pageParam = 1,
}: LocationFetchParams): Promise<Location[]> {
  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/location?page=" + pageParam,
  );

  return data.results;
}

export default function Locations() {
  const [searchLocation, setSearchLocation] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["location"],
    queryFn: locationFetch,
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) => {
      if (lastPageParam >= 7) return undefined;
      return lastPageParam + 1;
    },
  });

  const filteredSearchLocation = data?.pages.map((page) =>
    page.filter((location) =>
      location.name
        .toLowerCase()
        .includes(searchLocation.toLocaleLowerCase()),
    ),
  ) || [];

  if (isLoading) {
    return <div>Идет загрузка, подождите!</div>;
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

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
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
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
        {filteredSearchLocation.map((page) =>
          page.map((location: Location) => (
            <LocationCard
              key={location.id}
              id={location.id}
              name={location.name}
              dimension={location.dimension}
              type={location.type}
            />
          )),
        )}
      </ul>
      <LoadMore
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      />
    </div>
  );
}
