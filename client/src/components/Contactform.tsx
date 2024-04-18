import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, contact } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { getSent, getQ } from "@/store/atom/inoutquery";
const Contactform = ({ property, setD }: any) => {
  const [loading, setL] = useState(false);
  const refresh = useRecoilRefresher_UNSTABLE(getSent);
  const reff = useRecoilRefresher_UNSTABLE(getQ);
  console.log(property);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contact>({
    resolver: zodResolver(contactSchema),
  });
  const submit: SubmitHandler<contact> = async (data) => {
    setL(true);
    toast("sending you message");
    try {
      const body = {
        message: data.message,
        phonenumber: data.phonenumber,
        propertyId: property,
      };
      const res = await axios.post("http://localhost:3000/contact", body, {
        withCredentials: true,
      });
      console.log(res.data);
      toast.success("message sent!");
      refresh();
      reff();
      setD(false);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong!");
      setL(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col justify-center items-center gap-3 w-full"
    >
      <div className="w-full">
        <label>Phone Number</label>
        <Input placeholder="2312322222" {...register("phonenumber")} />
        <h1 className="text-red-500">
          {errors.phonenumber && errors.phonenumber?.message}
        </h1>
      </div>
      <div className="w-full">
        <label>Message</label>
        <Input
          placeholder="I am really interested in this offer"
          {...register("message")}
        />
        <h1 className="text-red-500">
          {errors.message && errors.message?.message}
        </h1>
      </div>
      <Button
        className="w-full"
        variant={"destructive"}
        disabled={loading}
        type="submit"
      >
        Send
      </Button>
    </form>
  );
};

export default Contactform;
