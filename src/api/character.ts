import axios from "axios";
import type { Character } from "../types";

export async function characterFetch(
  pageParam: number = 1,
): Promise<Character[]> {
  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/character/?page=" + pageParam,
  );

  return data.results;
}

export async function residentFetch(
  residentUrls: string[],
): Promise<Character[]> {
  const requests = residentUrls.map((url) => axios.get<Character>(url));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
}

export async function characterDetailFetch(
  id: string | undefined,
): Promise<Character> {
  if (!id) {
    throw new Error("Character ID is undefined");
  }

  const { data } = await axios.get<Character>(
    `https://rickandmortyapi.com/api/character/${id}`,
  );

  return data;
}
