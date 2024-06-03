import useGetMessages from "@/hooks/useGetMessages";
import useSendMessage from "@/hooks/useSendMessage";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage } = useSendMessage();
  const { mutate } = useGetMessages();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!message) return;
      const res = await sendMessage(message);
      mutate();
      setMessage("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {/* {loading ? <div className='loading loading-spinner'></div> :  */}
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
