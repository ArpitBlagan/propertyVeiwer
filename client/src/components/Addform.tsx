import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProperty, property } from "@/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "./ui/input";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { getProperty } from "@/store/atom/property";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
export const Addform = () => {
  const navigate = useNavigate();
  const [type, setT] = useState("");
  const [loading, setL] = useState(false);
  const refresh = useRecoilRefresher_UNSTABLE(getProperty);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<property>({
    resolver: zodResolver(addProperty),
  });
  const submit: SubmitHandler<property> = async (data) => {
    setL(true);
    console.log(data);
    toast("Adding Property...");
    try {
      const formdata = new FormData();
      formdata.append("type", type);
      formdata.append("location", data.location);
      formdata.append("file", data.file[0]);
      formdata.append("description", data.description);
      formdata.append("price", data.price.toString());
      const res = await axios.post(
        "https://propertyveiwer.onrender.com/property",
        formdata,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("user signin successfullly!");
      refresh();
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong! please try again later");
      setL(false);
    }
  };
  return (
    <div className="flex justify-center items-center  h-screen">
      <form
        onSubmit={handleSubmit(submit)}
        className="md:w-1/2 w-full flex flex-col   border border-gray-200 rounded-xl px-3 py-4 gap-3"
      >
        <div className="text-center">
          <h1 className="text-xl font-bold">Add Property!</h1>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label>Description</label>
          <Textarea placeholder="3 BHK etc" {...register("description")} />
          <h3 className="text-red-500">
            {errors.description && errors.description?.message}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label>Location</label>
          <Input
            placeholder="Moahli sector 70 near HDFC bank"
            {...register("location")}
          />
          <h3 className="text-red-500">
            {errors.location && errors.location?.message}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label>Price</label>
          <Input placeholder="400000" type="number" {...register("price")} />
          <h3 className="text-red-500">
            {errors.price && errors.price?.message}
          </h3>
        </div>
        <div className="flex flex-row justify-around items-center gap-2">
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => {
              setT(e.target.value);
            }}
          >
            <option defaultChecked>Types</option>
            <option value="Land">Land</option>
            <option value="Redidential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label>Image</label>
          <Input type="file" {...register("file")} />
        </div>
        <Button variant={"destructive"} type="submit" disabled={loading}>
          Add
        </Button>
      </form>
    </div>
  );
};
