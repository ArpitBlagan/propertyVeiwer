import axios from "axios";
import { atom, selector } from "recoil";

export const getSent = selector({
  key: "getSent",
  get: async () => {
    try {
      const dd = await axios.get(
        "https://propertyveiwer.onrender.com/outcontact",
        {
          withCredentials: true,
        }
      );
      console.log(dd.data);
      return dd.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
});
export const getQ = selector({
  key: "q",
  get: async () => {
    try {
      const dd = await axios.get(
        "https://propertyveiwer.onrender.com/incontact",
        {
          withCredentials: true,
        }
      );
      console.log(dd.data);
      return dd.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
});
export const Ssent = atom({
  key: "sent",
  default: getSent,
});

export const inn = atom({
  key: "in",
  default: getQ,
});
