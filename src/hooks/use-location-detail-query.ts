import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { locationDetailFetch, residentFetch } from "../api";

export const useLocationDetailQuery = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: locationData,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = useQuery({
    queryKey: ["location", id],
    queryFn: () => locationDetailFetch(id!),
    enabled: !!id,
  });

  const {
    data: residentList,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
  } = useQuery({
    queryKey: ["locationResidents", locationData?.id],
    queryFn: () => residentFetch(locationData!.residents),
    enabled: !!locationData && !!locationData.residents,
  });

  const isLoading = isCharacterLoading || isLocationLoading;
  const isError = isCharacterError || isLocationError;


  return { locationData, residentList, isLoading, isError };
};
