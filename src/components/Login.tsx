import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserStore from "../store/store";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setUser = UserStore.getState().setUser;

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/auth/login`,
        data
      );
      console.log(response.data);

      if (response.status === 200) {
        setUser(
          response.data.username,
          response.data.email,
          response.data.authentication.sessionToken
        );

        // chrome.storage.local.set({
        //   sessionToken: response.data.authentication.sessionToken,
        // });

        navigate("/summary");
      }

      // console.log(response.data);
    } catch (error: any) {
      // Handle login error
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 flex justify-center items-center  h-[500px]"
    >
      <div className="bg-white shadow-md rounded-lg p-8 h-[480px] w-[480px] ">
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              id="email"
              className="mt-1 block w-full text-black py-2 px-4 placeholder-black  border-black border-b-2 outline-none  hover:border-blue-500 "
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500">
                {errors.email.message?.toString()}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full text-black py-2 px-4 placeholder-black  border-black border-b-2 outline-none  hover:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500">
                {errors.password.message?.toString()}
              </span>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full font-bold py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an Account?{" "}
              <a
                href="#/signup"
                className="ml-1 underline hover:text-blue-500 "
              >
                SignUp Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
