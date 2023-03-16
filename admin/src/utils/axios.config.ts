import { useLocalStorage } from "../hooks/useLocalStorage";
export const config = {
  headers: {
    Authorization: `Bearer ${useLocalStorage("token", {}).token}`,
    Accept: "application/json",
  },
};
