import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { characterDetailFetch, detailsEpisodeFetch } from "../api";
import type { Episode } from "../types";

export const useCharacterDetailQuery = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: character,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: () => characterDetailFetch(id),
    enabled: !!id,
  });

  const {
    data: episodeList,
    isLoading: isEpisodesLoading,
    isError: isEpisodesError,
  } = useQuery<Episode[]>({
    queryKey: ["episode-list", character?.id],
    queryFn: () => detailsEpisodeFetch(character!.episode),
    enabled: !!character && !!character.episode,
  });

  const isLoading = isCharacterLoading || isEpisodesLoading;
  const isError = isCharacterError || isEpisodesError;

  return { character, episodeList, isError, isLoading };
};
