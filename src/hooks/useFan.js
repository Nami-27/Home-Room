import { useQuery } from "react-query";
import { fetchFans } from "../utils/url";

export const useFanData = (onSuccess, onError) => {
  return useQuery("fans", fetchFans, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    onSuccess,
    onError,
  });
};
