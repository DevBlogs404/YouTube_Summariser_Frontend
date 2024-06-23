import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3).max(20).nonempty(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { username, email, password } = data;

      const response = await axios.post(
        `http://localhost:8000/api/v1/auth/register`,
        { username, email, password }
      );
      if (response.status === 200) {
        // console.log(response.data);
        navigate("/login");
      }
    } catch (error) {
      console.log("login error: ", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 flex justify-center items-center  h-[500px]"
    >
      <div className="bg-white shadow-md rounded-lg p-8 h-[480px] w-[480px] ">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            id="username"
            className="mt-1 block w-full text-black py-2 px-4 placeholder-black  border-black border-b-2 outline-none  hover:border-blue-500"
            placeholder="Enter your username"
          />
          {errors.username && (
            <span className="text-red-500">
              {errors.username.message?.toString()}
            </span>
          )}
        </div>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            id="confirmPassword"
            className="mt-1 block w-full text-black py-2 px-4 placeholder-black  border-black border-b-2  outline-none hover:border-blue-500"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message?.toString()}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full font-bold py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an Account?{" "}
            <a href="#/login" className=" ml-1 underline hover:text-blue-500">
              Login Here
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
