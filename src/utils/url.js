import { request } from "./axios";
import nextId from "react-id-generator";

export const fetchRoom = () => {
  return request({ url: "/rooms" });
};

export const fetchBulbs = () => {
  return request({ url: "/bulbs" });
};

export const fetchFans = () => {
  return request({ url: "/fans" });
};

export const addRoom = (room) => {
  let fob = { id: nextId("f"), room: room?.id, state: 0 };
  let bob = { id: nextId("b"), room: room?.id, state: 0 };
  let fans = Array(room?.fans).fill(fob),
    bulbs = Array(room?.bulbs).fill(bob);

  return Promise.all([
    request({ url: "/rooms", method: "post", data: room }),
    request({ url: "/fans", method: "post", data: fans }),
    request({ url: "/bulbs", method: "post", data: bulbs }),
  ]);
};

export const addFans = (fans) => {
  return request({ url: "/fans", method: "post", data: fans });
};

export const addBulbs = (bulbs) => {
  return request({ url: "/bulbs", method: "post", data: bulbs });
};

export const changeLight = (roomId, change) => {
  return request({ url: `/bulbs/${roomId}`, method: "put", data: change });
};

export const changeFan = (roomId, change) => {
  return request({ url: `/fans/${roomId}`, method: "put", data: change });
};
