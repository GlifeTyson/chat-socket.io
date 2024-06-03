import { login } from "@/services/user";
import Auth from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return toast.error("Please fill in all fields");
    try {
      toast.success("success");
      const res = await login(username, password);
      const { token, success } = res.login;

      if (success) {
        toast.success("login success");
        toast.remove();
        Auth.login(token);
        if (Auth.check()) {
          setTimeout(() => {
            toast.success("redirect to home page");
            router.push("/");
          }, 300);
        } else {
          toast.error("something went wrong");
        }
      } else {
        toast.error("login failed");
      }
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto w-screen h-screen">
      <div className="w-[400px] h-[320px] my-auto p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            href="/signup"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
