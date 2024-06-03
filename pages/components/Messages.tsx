import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "@/hooks/useGetMessages";
interface MessageProps {
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
const Messages = () => {
  const { messages, isLoading } = useGetMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll to last message
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!isLoading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
