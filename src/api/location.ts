import axios from "axios";
import type { FetchParams, Location } from "../types";

export async function locationFetch({
  pageParam = 1,
}: FetchParams): Promise<Location[]> {
  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/location?page=" + pageParam,
  );

  return data.results;
}
