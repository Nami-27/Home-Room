import { useQuery ,useMutation} from "react-query";
import { changeFan, fetchFans } from "../utils/url";

export const useFanData = (onSuccess, onError) => {
  return useQuery("fans", fetchFans, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    onSuccess,
    onError,
  });
};

export const useFanChange = (data) => {
  console.log("change fan", { data });
  return useMutation(changeFan(data), {
    onSuccess: (data) => {
      console.log("success update fan", data);
    },
    onError: (error) => {
      console.error("error updating fan", error);
    },
    onMutate: (data) => {
      console.log("on mutate fan", data);
    },
  });
};
