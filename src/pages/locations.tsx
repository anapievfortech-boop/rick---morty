import logoLocations from "../assets/rick-and-morty-locations.jpg";
import LoadMore from "../components/load-button/load-more";
import LocationCard from "../components/location/location-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Location } from "../types";
import { locationFetch } from "../api";
import Select from "../components/select-option";
import { selectOptions } from "../data/select-options";

export default function Locations() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectType, setSelectType] = useState("");

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

  const filteredSearchLocation =
    data?.pages.flatMap((page) =>
      page.filter(
        (location) =>
          location.name.toLowerCase().includes(searchLocation.toLowerCase()) &&
          location.type.toLowerCase().includes(selectType.toLowerCase()),
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
          <Select
            className="form-select hide-on-mobile"
            name="Type"
            id=""
            value={selectType}
            onChange={setSelectType}
            options={selectOptions.type}
          />
          <Select
            className="form-select hide-on-mobile"
            name="Type"
            id=""
            value={selectType}
            onChange={setSelectType}
            options={selectOptions.type}
          />
        </form>
      </div>
      <ul className="locations-cards wrapper">
        {filteredSearchLocation.map((location: Location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            dimension={location.dimension}
            type={location.type}
            residents={location.residents}
          />
        ))}
      </ul>
      <LoadMore
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      />
    </div>
  );
}
