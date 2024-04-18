import { fav } from "@/store/atom/favv";
import { useRecoilValueLoadable } from "recoil";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { getFav } from "@/store/atom/favv";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { getDetail } from "@/store/atom/user";
import { useState } from "react";
import axios from "axios";
const Favc = () => {
  const ff = useRecoilValueLoadable(fav);
  const refresh = useRecoilRefresher_UNSTABLE(getFav);
  const reff = useRecoilRefresher_UNSTABLE(getDetail);
  const [loading, setL] = useState(false);
  if (ff.state === "loading") {
    return <div>loading...</div>;
  }
  if (ff.state == "hasError") {
    return <div>something went wrong</div>;
  }
  const handleRemove = async (id: any) => {
    toast("removing from favourite");
    setL(true);
    console.log(id);
    try {
      const ff = await axios.delete(
        `https://propertyveiwer.onrender.com/fav${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(ff.data);
      setL(false);
      refresh();
      reff();
      toast.success("remoed successfully");
    } catch (err) {
      console.log(err);
      setL(false);
      toast.error("something went wrong please try again later");
    }
  };
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 ">
      {ff.contents.map((ele: any, index: number) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-center  border border-gray-400 p-3 rounded-xl"
          >
            <img
              src={ele.image}
              width={200}
              className="w-full rounded-xl py-2"
              height={200}
            />
            <div className="flex flex-col justify-center items-start text-sm font-gray-500">
              <p className="text-gray-500">{ele.description}</p>
              <p>Type: {ele.type}</p>
              <p>Location: {ele.location}</p>
              <p>Price: ${ele.price}</p>
            </div>
            <div>
              <Button
                variant={"destructive"}
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove(ele._id);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favc;
