import { atom, selector } from "recoil";
import axios from "axios";
export const getProperty = selector({
  key: "getProperty",
  get: async () => {
    const res = await axios.get("http://localhost:3000/property", {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  },
});
export const properties = atom({
  key: "properties",
  default: getProperty,
});
