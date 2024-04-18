import axios from "axios";
import { atom, selector } from "recoil";
export const getFav = selector({
  key: "getfav",
  get: async () => {
    try {
      const dd = await axios.get("http://localhost:3000/fav", {
        withCredentials: true,
      });
      console.log(dd.data);
      return dd.data.favourite;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
});
export const fav = atom({
  key: "fav",
  default: getFav,
});
