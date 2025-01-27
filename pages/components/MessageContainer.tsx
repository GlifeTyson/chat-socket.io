import React, { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { UserContext } from "@/context/UserProvider";
import useConversation from "@/zustand/useConversation";

const MessageContainer = () => {
  const { selectedUser, setSelectedUser } = useConversation();

  useEffect(() => {
    return () => setSelectedUser(null);
  }, [setSelectedUser]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedUser ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold pl-2">
              {selectedUser?.fullName}
            </span>
          </div>
          {/* Body */}
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  // const { authUser } = useAuthContext();
  const { me } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    if (me) {
      setUsername(me?.username);
    }
  }, [me]);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {username} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
