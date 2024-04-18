import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/types";
import { signup } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setL] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<register>({
    resolver: zodResolver(signup),
  });
  const submit: SubmitHandler<register> = async (data) => {
    setL(true);
    toast("Signing Up the user");
    try {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await axios.post(
        "https://propertyveiwer.onrender.com/signup",
        body,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("user signup successfullly!");
      navigate("/signin");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong! please try again later");
      setL(false);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="md:w-1/2 w-full border border-gray-200 rounded-xl px-3 py-2"
      >
        <div className="text-center py-4 text-gray-500">
          <h1>
            Already have an account ?{" "}
            <Link className="underline text-gray-700" to="/signin">
              Signin
            </Link>
          </h1>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label>Email</label>
          <Input placeholder="arpit@gmail.com" {...register("email")} />
          <h3 className="text-red-500">
            {errors.email && errors.email?.message}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label>Name</label>
          <Input placeholder="Arpit Blagan" {...register("name")} />
          <h3 className="text-red-500">
            {errors.name && errors.name?.message}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label>Password</label>
          <Input
            type="password"
            placeholder="ar@342!"
            {...register("password")}
          />
          <h3 className="text-red-500">
            {errors.password && errors.password?.message}
          </h3>
        </div>
        <div>
          <Button disabled={loading} type="submit" variant={"destructive"}>
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
