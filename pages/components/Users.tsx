import React from "react";
import useGetUsers from "@/hooks/useGetUsers";
import User from "./User";

interface UserProps {
  id: string;
  username: string;
  fullName: string;
  gender: string;
  profilePicture: string;
}
const Users = () => {
  const { users, isLoading } = useGetUsers();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {users?.map((user: UserProps, index: number) => (
        <User
          key={user.id}
          user={user}
          lastIndex={index === users.length - 1}
        />
      ))}
      {isLoading && <div className="loading-spinner">Loading...</div>}
    </div>
  );
};

export default Users;
