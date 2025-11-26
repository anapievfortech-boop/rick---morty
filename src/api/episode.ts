import axios from "axios";
import type { FetchParams, Episode } from "../types";

export async function episodeFetch({
  pageParam = 1,
}: FetchParams): Promise<Episode[]> {
  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/episode?page=" + pageParam,
  );

  return data.results;
}

export async function detailsEpisodeFetch(episodeUrl: string[]): Promise<Episode[]> {
  const request = episodeUrl.map((url) => axios.get<Episode>(url));
  const response = await Promise.all(request);
  return response.map((response) => response.data);
}

export async function episodeDetailFetch(id: string | undefined) {
  const { data } = await axios.get<Episode>(
    `https://rickandmortyapi.com/api/episode/${id}`,
  );

  return data;
}