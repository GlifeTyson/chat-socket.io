import React, { useState } from "react";
import GenderCheckbox from "./components/GenderCheckBox";
import Link from "next/link";
import toast from "react-hot-toast";
import _ from "lodash";
import useSignUp from "@/hooks/useSignUp";

const Register = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signUp } = useSignUp();
  // const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signUp(inputs);
    console.log("res", res.createUser);
    const { createUser } = res.createUser;
    if (createUser?.success) {
      toast.success(createUser?.message);
      toast.remove();
      setTimeout(() => {
        toast.success("redirect to login page");
        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      }, 300);
    } else {
      toast.error(res.createUser.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 w-full h-screen">
      <div className="w-[500px] h-[600px] p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              required={true}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              required={true}
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required={true}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              required={true}
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            href={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              //   disabled={loading}
            >
              {/* {loading ? ( */}
              {/* <span className="loading loading-spinner"></span> */}
              {/* ) : ( */}
              Sign Up
              {/* )} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
