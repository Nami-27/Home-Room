import { useQuery, useMutation } from "react-query";
import { changeLight, fetchBulbs } from "../utils/url";

export const useLightData = (onSuccess, onError) => {
  return useQuery("bulbs", fetchBulbs, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
  });
};

export const useLightChange = (data) => {
  console.log("change light", { data });
  return useMutation(changeLight(data), {
    onSuccess: (data) => {
      console.log("success update light", data);
    },
    onError: (error) => {
      console.error("error updating light", error);
    },
    onMutate: (data) => {
      console.log("on mutate light", data);
    },
  });
};
