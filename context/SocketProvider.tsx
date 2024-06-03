import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";
import io from "socket.io-client";

export const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const { me } = useContext(UserContext);

  useEffect(() => {
    if (me) {
      const newSocket = io("http://localhost:3001", {
        query: { userId: me?.id },
      });
      setSocket(newSocket);
      newSocket.on("getOnlineUsers", (users: any) => {
        setOnlineUsers(users);
      });
      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [me]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
