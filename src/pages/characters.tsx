import CharacterCard from "../components/character/character-card";
import LoadMore from "../components/load-button/load-more";
import { useState, type JSX } from "react";
import Logo from "../assets/Rick-and-Morty-logo.jpg";
import styles from "../components/character.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import AdvancedFilter from "../components/mobile-components/advanced-filter-charcter";
import SelectFilter from "../components/character/select-filter";
import type { Character } from "../types";
import { characterFetch } from "../api";
import { useMobile } from "../components/contexts/mobile-context";

export default function Characters(): JSX.Element {
  const [searchCharacter, setSearchCharacter] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [selectSpecies, setSelectSpecies] = useState("");
  const isMobile = useMobile()

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["character"],
    queryFn: characterFetch,
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) => {
      if (lastPageParam >= 42) return undefined;
      return lastPageParam + 1;
    },
  });

  const filteredSearchCharacter =
    data?.pages.flatMap((page) =>
      page.filter(
        (character) =>
          character.name
            .toLowerCase()
            .includes(searchCharacter.toLowerCase()) &&
          character.gender.toLowerCase().includes(selectGender.toLowerCase()) &&
          character.status.toLowerCase().includes(selectStatus.toLowerCase()) &&
          character.species.toLowerCase().includes(selectSpecies.toLowerCase()),
      ),
    ) || [];

  if (isLoading) {
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
    <>
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
                value={searchCharacter}
                onChange={(e) => setSearchCharacter(e.target.value)}
              />
            </div>
            {!isMobile ? (
              <SelectFilter
                selectSpecies={selectSpecies}
                selectGender={selectGender}
                selectStatus={selectStatus}
                setSelectSpecies={setSelectSpecies}
                setSelectGender={setSelectGender}
                setSelectStatus={setSelectStatus}
              />
            ) : (
              <AdvancedFilter
                selectSpecies={selectSpecies}
                selectGender={selectGender}
                selectStatus={selectStatus}
                setSelectSpecies={setSelectSpecies}
                setSelectGender={setSelectGender}
                setSelectStatus={setSelectStatus}
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
        <LoadMore
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        />
      </div>
    </>
  );
}
