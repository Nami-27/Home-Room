import { useQuery} from "react-query";
import { fetchBulbs } from "../utils/url";

export const useLightData = (onSuccess, onError) => {
  return useQuery("bulbs", fetchBulbs, {
    refetchOnMount: true,
    refetchOnWindowFocus:true,
    onSuccess,
    onError,
  });
};