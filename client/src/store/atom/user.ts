import { selector, atom } from "recoil";
import axios from "axios";
export const getDetail = selector({
  key: "getDetail",
  get: async () => {
    try {
      const res = await axios.get(
        "https://propertyveiwer.onrender.com/isloggedin",
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.isloggedin == "true") {
        return res.data;
      }
    } catch (err) {
      console.log(err);
      return { isloggedin: false };
    }
  },
});
export const change = atom({
  key: "change",
  default: getDetail,
});
