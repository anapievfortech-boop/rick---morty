import logoLocations from "../assets/rick-and-morty-locations.jpg";
import LoadMore from "../components/load-button/load-more";
import LocationCard from "../components/location/location-card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationsPage,
  selectLocationstate,
  setFilters,
} from "../store/locations/locations-slice";
import type { AppDispatch } from "../store/store";
import { useEffect, useMemo, useState } from "react";
import type { Location } from "../types";
import SelectFilterLocation from "../components/location/select-filter-location";
import { useMobile } from "../components/contexts/mobile-context";
import AdvencedFilterLocation from "../components/mobile-components/advanced-filter-location";

export default function Locations() {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMobile();

  const {
    data: allLocations,
    filters,
    isLoading,
    isError,
    hasNextPage,
  } = useSelector(selectLocationstate);

  const [searchInput, setSearchInput] = useState(filters.searchLocation);

  const filteredSearchLocation = useMemo(() => {
    return allLocations.filter((location) => {
      const matchesName = location.name
        .toLowerCase()
        .includes(filters.searchLocation.toLowerCase());
      const matchesType = location.type
        .toLowerCase()
        .includes(filters.selectType.toLowerCase());
      const matchesDimension = location.dimension
        .toLowerCase()
        .includes(filters.selectDimension.toLowerCase());
      return matchesName && matchesType && matchesDimension;
    });
  }, [allLocations, filters]);

  useEffect(() => {
    if (allLocations.length === 0 && !isLoading && hasNextPage) {
      dispatch(fetchLocationsPage());
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      dispatch(fetchLocationsPage());
    }
  };

  const handleFilterChange = (
    filterName: keyof typeof filters,
    value: string,
  ) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    handleFilterChange("searchLocation", value);
  };

  if (isLoading && allLocations.length === 0) {
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
            <a className="search-logo" />
            <input
              type="text"
              className="form-input locations-input"
              placeholder="Filter by name..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          {!isMobile ? (
            <SelectFilterLocation
              selectType={filters.selectType}
              selectDimension={filters.selectDimension}
              setSelectType={(val) => {
                handleFilterChange("selectType", val);
              }}
              setSelectDimension={(val) => {
                handleFilterChange("selectDimension", val);
              }}
            />
          ) : (
            <AdvencedFilterLocation
              selectType={filters.selectType}
              selectDimension={filters.selectDimension}
              setSelectType={(val) => {
                handleFilterChange("selectType", val);
              }}
              setSelectDimension={(val) => {
                handleFilterChange("selectDimension", val);
              }}
            />
          )}
        </form>
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
      </div>
      <LoadMore onClick={handleLoadMore} disabled={!hasNextPage || isLoading} />
    </div>
  );
}
