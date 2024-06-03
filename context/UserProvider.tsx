import React, { useState, useEffect, useContext } from "react";
import Auth from "../utils/auth";
import useSWR from "swr";
import { fetchMe } from "../graphql/queries/user.queries";
import { fetcher } from "../services/fetcher";

interface User {
  id: string;
  username: string;
  profilePicture: string;
}

interface UserContextType {
  me: User | null;
  handleLogout: () => void;
}

const defaultContextValue: UserContextType = {
  me: null,
  handleLogout: () => {},
};

const UserContext = React.createContext<UserContextType>(defaultContextValue);

function UserProvider({ children }: { children: React.ReactNode }) {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR([fetchMe, {}], fetcher);

  const me = userData?.Me || null; // Lấy giá trị từ data của useSWR

  useEffect(() => {
    if (userError) {
      handleLogout();
    }
  }, [userError]);

  function handleLogout() {
    const response = Auth.logout();
    if (response) {
      window.location.href = "/login";
    }
  }

  return (
    <UserContext.Provider
      value={{
        me,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const UserConsumer = UserContext.Consumer;

export default UserProvider;
export { UserConsumer, UserContext };
