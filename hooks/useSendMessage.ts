import { sendMessageQuery } from "@/graphql/mutations/messageMutation";
import { createAxios } from "@/libs/axios";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedUser } = useConversation();

  const sendMessage = async (message: string) => {
    try {
      if (!selectedUser) return;
      setLoading(true);
      const response = await createAxios().post(
        "http://localhost:3001/graphql",
        {
          query: sendMessageQuery,
          variables: {
            content: message,
            receiverId: selectedUser?.id,
            groupId: null,
            conversationId: null,
          },
        }
      );
      console.log("response", response);
      setMessages([...messages, response.data.data.sendMessage]);
      setLoading(false);
    } catch (error) {
    } finally {
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
