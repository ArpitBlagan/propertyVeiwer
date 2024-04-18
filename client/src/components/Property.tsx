import { properties } from "@/store/atom/property";
import { useRecoilValueLoadable } from "recoil";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { getFav } from "@/store/atom/favv";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Dialog from "./Dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Property = () => {
  const navigate = useNavigate();
  const refresh = useRecoilRefresher_UNSTABLE(getFav);
  const propertiesLoadable = useRecoilValueLoadable(properties);
  const [loading, setL] = useState(false);
  if (propertiesLoadable.state === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (propertiesLoadable.state === "hasError") {
    return <div className="text-center">Error loading data</div>;
  }
  const handleAdd = async (id: any) => {
    toast("adding to favourite");
    setL(true);
    console.log(id);
    try {
      const ff = await axios.post(
        "http://localhost:3000/fav/add",
        { propertyId: id },
        { withCredentials: true }
      );
      console.log(ff.data);
      setL(false);
      refresh();
      toast.success("added successfully");
      navigate("/fav");
    } catch (err) {
      console.log(err);
      setL(false);
      toast.error("something went wrong please try again later");
    }
  };
  return (
    <div className="my-3 min-h-screen">
      <React.Suspense fallback={<div className="text-center">Loading...</div>}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {propertiesLoadable.contents.map((ele: any, index: number) => {
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
                <div className="flex justify-around">
                  <Button
                    variant={"destructive"}
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAdd(ele._id);
                    }}
                  >
                    Add To Favourite
                  </Button>
                  <Button variant={"destructive"}>
                    <Dialog id={ele._id} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </React.Suspense>
      <h1 className="text-center">That's it</h1>
    </div>
  );
};

export default Property;
