import { create } from "zustand";
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
interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}
interface User {
  id: string;
  username: string;
  fullName: string;
  gender: string;
  profilePicture: string;
}
interface UseConversationReturnType {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}
const useConversation = create<UseConversationReturnType>((set) => ({
  selectedUser: null,
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
}));

export default useConversation;
