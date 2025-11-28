import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { episodeDetailFetch, residentFetch } from "../api";

export const useEpisodeDetailQuery = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: episodeData,
    isLoading: isEpisodeLoading,
    isError: isEpisodeError,
  } = useQuery({
    queryKey: ["episode", id],
    queryFn: () => episodeDetailFetch(id!),
    enabled: !!id,
  });

  const {
    data: residentList,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
  } = useQuery({
    queryKey: ["episodeResidents", episodeData?.id],
    queryFn: () => residentFetch(episodeData!.characters),
    enabled: !!episodeData && !!episodeData.characters,
  });

  const isLoading = isCharacterLoading || isEpisodeLoading;
  const isError = isCharacterError || isEpisodeError;

  return { episodeData, residentList, isLoading, isError };
};
