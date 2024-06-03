import { SocketContext } from "@/context/SocketProvider";
import useConversation from "@/zustand/useConversation";
import React, { useContext } from "react";
interface User {
  id: string;
  username: string;
  fullName: string;
  gender: string;
  profilePicture: string;
}
interface Props {
  user: User;
  lastIndex: boolean;
}
const User = ({ user, lastIndex }: Props) => {
  const { selectedUser, setSelectedUser } = useConversation();
  const { onlineUsers } = useContext(SocketContext);
  if (onlineUsers) {
    console.log("onlineUsers", onlineUsers);
  }
  const isOnline = onlineUsers?.includes(user?.id);
  const isSelected = selectedUser?.id === user?.id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedUser(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={`${user?.profilePicture}`} alt="profilePicture" />
          </div>
        </div>
        {/* <div className="avatar offline">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div> */}
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{user?.fullName}</p>
            <span>🥰</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default User;
