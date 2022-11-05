import { useMutation, useQuery, useQueryClient } from "react-query";
import { addRoom, fetchRoom } from "../utils/url";

export const useRoomData = (onSuccess, onError) => {
  return useQuery("rooms", fetchRoom, {
    refetchOnMount: true,
    refetchOnWindowFocus:true,
    onSuccess,
    onError,
    select: (data) => {
      const roomNames = data.data.map((room) => room.id);
      return roomNames;
    },
  });
};

export const useAddRoomData = () => {
  const queryClient = useQueryClient();

  return useMutation(addRoom, {
    onSuccess: (data) => {
      console.log({ data });
      queryClient.setQueryData("room", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
    onMutate: async (newRoom) => {
      console.log("mutate", newRoom);
      await queryClient.cancelQueries("rooms");
      await queryClient.cancelQueries("bulbs");
      await queryClient.cancelQueries("fans");

      const previousRoomData = queryClient.getQueryData("rooms");
      const previousBulbData = queryClient.getQueryData("bulbs");
      const previousFanData = queryClient.getQueryData("fans");

      queryClient.setQueryData("rooms", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newRoom },
          ],
        };
      });
      let obj = { room: newRoom?.id, state: 0 };
      let fans = Array(newRoom?.fans).fill(obj),
        bulbs = Array(newRoom?.bulbs).fill(obj);
      queryClient.setQueryData("fans", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, fans],
        };
      });
      queryClient.setQueryData("bulbs", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, bulbs],
        };
      });
      return { previousRoomData, previousBulbData, previousFanData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("rooms", context.previousRoomData);
      queryClient.setQueryData("bulbs", context.previousBulbData);
      queryClient.setQueryData("fans", context.previousFanData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("rooms");
      queryClient.invalidateQueries("bulbs");
      queryClient.invalidateQueries("fans");
    },
  });
};
