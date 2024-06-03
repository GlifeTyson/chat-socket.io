import Auth from "@/utils/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";

const LogOutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout: () => void = () => {
    try {
      Auth.logout();
      if (!Auth.check()) {
        toast.success("You have successfully logged out");
        toast.remove();
        setTimeout(() => {
          toast.success("redirect to login page");
          router.push("/login");
        }, 300);
      }
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={handleLogout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogOutButton;
