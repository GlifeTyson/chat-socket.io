import { signupQuery } from "@/graphql/mutations/userMutation";
import { createAxios } from "@/libs/axios";
import _ from "lodash";
import { useState } from "react";
import toast from "react-hot-toast";

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const signUp = async (input: any) => {
    try {
      const checkInput = handleInput(input);
      if (!checkInput) return;
      setLoading(true);
      const omitInput = _.omit(input, ["confirmPassword"]);
      const { data } = await createAxios().post(
        "http://localhost:3001/graphql",
        {
          query: signupQuery,
          variables: { input: omitInput },
        }
      );
      setLoading(false);
      return data.data;
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return { loading, signUp };
};

export default useSignUp;
interface InputType {
  fullName: string;
  password: string;
  confirmPassword: string;
  gender: string;
}
function handleInput({
  fullName,
  password,
  confirmPassword,
  gender,
}: InputType) {
  if (!fullName || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be at least 6 characters");
    return false;
  }
  return true;
}
