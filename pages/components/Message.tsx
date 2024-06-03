/* eslint-disable @next/next/no-img-element */
import { UserContext } from "@/context/UserProvider";
import React, { useContext } from "react";
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  groupId: string | null;
  conversationId: string | null;
  sender: {
    id: string;
    fullName: string;
    profilePicture: string;
  };
  receiver: {
    id: string;
    fullName: string;
  };
  content: string;
  createdAt: string;
}
const Message = ({ message }: { message: Message }) => {
  const { me } = useContext(UserContext);

  const fromMe = message.senderId === me?.id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? me?.profilePicture
    : message?.sender?.profilePicture;
  const bubbleBg = fromMe ? "bg-blue-500" : "bg-gray-600";
  const time = new Date(message.createdAt).toDateString();

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="1231" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBg}`}>
        {message?.content}
      </div>
      <div className="chat-footer">{time}</div>
    </div>
  );
};

export default Message;
