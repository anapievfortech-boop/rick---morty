import axios from "axios";
import type { Location } from "../types";

export async function locationFetch(
  pageParam: number = 1,
): Promise<Location[]> {
  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/location?page=" + pageParam,
  );

  return data.results;
}

export async function locationDetailFetch(id: string | undefined) {
  const { data } = await axios.get<Location>(
    `https://rickandmortyapi.com/api/location/${id}`,
  );

  return data;
}
