import CharacterCard from "../components/character/character-card";
import LoadMore from "../components/load-button/load-more";
import { useState, type JSX } from "react";
import Logo from "../assets/Rick-and-Morty-logo.jpg";
import styles from "../components/character.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
// import AdvancedFilter from "../components/mobile-components/advanced-filter";

interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  origin: object;
  type: string;
  location: object;
  episode: any;
  url: string;
  created: string;
}

interface CharacterFetchParams {
  pageParam?: number;
}

async function characterFetch({
  pageParam = 1,
}: CharacterFetchParams): Promise<Character[]> {
  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/character/?page=" + pageParam,
  );

  return data.results;
}

export default function Characters(): JSX.Element {
  const [searchCharacter, setSearchCharacter] = useState("");

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
    data?.pages.map((page) =>
      page.filter((character) =>
        character.name.toLowerCase().includes(searchCharacter.toLowerCase()),
      ),
    ) || [];

  if (isLoading) {
    return <div>Идет загрузка, подождите!</div>;
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
            {/* <AdvancedFilter /> */}
            <select
              className={`${styles["form-select"]} ${styles["hide-on-mobile"]}`}
              name="Species"
              id=""
            >
              <option value="Species">Species</option>
            </select>
            <select
              className={`${styles["form-select"]} ${styles["hide-on-mobile"]}`}
              name="Species"
              id=""
            >
              <option value="Gender">Gender</option>
            </select>
            <select
              className={`${styles["form-select"]} ${styles["hide-on-mobile"]}`}
              name="Species"
              id=""
            >
              <option value="Status">Status</option>
            </select>
          </form>
          <ul className={styles["character-list"]}>
            {filteredSearchCharacter.map((page) =>
              page.map((character: Character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  species={character.species}
                />
              )),
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
