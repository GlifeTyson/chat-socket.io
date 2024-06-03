import { fetchMessageWithOther } from "@/graphql/queries/message.queries";
import { fetcher } from "@/services/fetcher";
import useConversation from "@/zustand/useConversation";
import { useEffect, useState } from "react";
import useSWR from "swr";
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  groupId: string | null;
  conversationId: string | null;
  sender: {
    id: string;
    fullName: string;
  };
  receiver: {
    id: string;
    fullName: string;
  };
  content: string;
  createdAt: string;
}

const useGetMessages = () => {
  const { messages, setMessages, selectedUser } = useConversation();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    data,
    error: fetchError,
    isLoading: fetchLoading,
    mutate,
  } = useSWR(
    selectedUser ? [fetchMessageWithOther, { userId: selectedUser?.id }] : null,
    fetcher
  );

  useEffect(() => {
    setIsLoading(fetchLoading);
    setError(fetchError);

    if (data) {
      setMessages(data?.myMessages);
    }
  }, [data, fetchError, fetchLoading, setMessages]);

  return { messages, error, isLoading, mutate };
};

export default useGetMessages;
