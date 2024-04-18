import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/types";
import { signin } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { change } from "@/store/atom/user";
const Signin = () => {
  const navigate = useNavigate();
  const setC = useSetRecoilState(change);
  const [loading, setL] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({
    resolver: zodResolver(signin),
  });
  const submit: SubmitHandler<login> = async (data) => {
    setL(true);
    toast("Signing In the user");
    try {
      const body = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post("http://localhost:3000/signin", body, {
        withCredentials: true,
      });
      console.log(res.data);

      toast.success("user signin successfullly!");
      setC(res.data);
      navigate("/");
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
            Don't have an account ?{" "}
            <Link className="underline text-gray-700" to="/signup">
              Signup
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
            Signin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
