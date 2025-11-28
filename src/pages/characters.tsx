import CharacterCard from "../components/character/character-card";
import LoadMore from "../components/load-button/load-more";
import { useEffect, useMemo, useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import {
  fetchCharactersPage,
  setFilters,
  selectCharacterState,
} from "../store/characters/characters-slice";
import Logo from "../assets/Rick-and-Morty-logo.jpg";
import styles from "../components/character.module.css";
import AdvancedFilter from "../components/mobile-components/advanced-filter-charcter";
import SelectFilterCharacter from "../components/character/select-filter-character";
import type { Character } from "../types";
import { useMobile } from "../components/contexts/mobile-context";

export default function Characters(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMobile();

  const {
    data: allCharacters,
    filters,
    isLoading,
    isError,
    hasNextPage,
  } = useSelector(selectCharacterState);

  const [searchInput, setSearchInput] = useState(filters.searchCharacter);

  const filteredSearchCharacter = useMemo(() => {
    const searchNameLower = filters.searchCharacter?.toLowerCase() || "";
    const filterGenderLower = filters.selectGender?.toLowerCase() || "";
    const filterStatusLower = filters.selectStatus?.toLowerCase() || "";
    const filterSpeciesLower = filters.selectSpecies?.toLowerCase() || "";

    return allCharacters.filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes(searchNameLower);
      const matchesGender =
        filterGenderLower === "" ||
        character.gender.toLowerCase() === filterGenderLower;
      const matchesStatus =
        filterStatusLower === "" ||
        character.status.toLowerCase() === filterStatusLower;
      const matchesSpecies =
        filterSpeciesLower === "" ||
        character.species.toLowerCase() === filterSpeciesLower;

      return matchesName && matchesGender && matchesStatus && matchesSpecies;
    });
  }, [allCharacters, filters]);

  useEffect(() => {
    if (allCharacters.length === 0 && !isLoading && hasNextPage) {
      dispatch(fetchCharactersPage());
    }
  }, [isLoading]);

  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      dispatch(fetchCharactersPage());
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
    handleFilterChange("searchCharacter", value);
  };

  if (isLoading && allCharacters.length === 0) {
    return (
      <div className={styles["card-list-empty-alert"]}>
        Идет загрузка, подождите!
      </div>
    );
  }

  if (isError) {
    return <div>Произошла ошибка!</div>;
  }

  return (
    <div className={styles["wrapper"]}>
      <img className={styles["main-logo"]} src={Logo} alt="main-logo" />
      <div className={styles["form-list"]}>
        <form className={styles["form"]} action="">
          <div style={{ position: "relative" }}>
            <a className={styles["search-logo"]} href="#" />
            <input
              className={styles["form-input"]}
              type="text"
              placeholder="Filter by name..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          {!isMobile ? (
            <SelectFilterCharacter
              selectSpecies={filters.selectSpecies}
              selectGender={filters.selectGender}
              selectStatus={filters.selectStatus}
              setSelectSpecies={(val) =>
                handleFilterChange("selectSpecies", val)
              }
              setSelectGender={(val) => handleFilterChange("selectGender", val)}
              setSelectStatus={(val) => handleFilterChange("selectStatus", val)}
            />
          ) : (
            <AdvancedFilter
              selectSpecies={filters.selectSpecies}
              selectGender={filters.selectGender}
              selectStatus={filters.selectStatus}
              setSelectSpecies={(val) =>
                handleFilterChange("selectSpecies", val)
              }
              setSelectGender={(val) => handleFilterChange("selectGender", val)}
              setSelectStatus={(val) => handleFilterChange("selectStatus", val)}
            />
          )}
        </form>
        <ul className={styles["character-list"]}>
          {filteredSearchCharacter.length > 0 ? (
            filteredSearchCharacter.map((character: Character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                gender={character.gender}
                status={character.status}
                origin={character.origin}
                type={character.type}
                location={character.location}
                episode={character.episode}
              />
            ))
          ) : (
            <li className={styles["card-list-empty-alert"]}>
              The character is not found. Try to load more!
            </li>
          )}
        </ul>
      </div>
      <LoadMore onClick={handleLoadMore} disabled={!hasNextPage || isLoading} />
    </div>
  );
}
