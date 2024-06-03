import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Users";
import LogOutButton from "./LogOutButton";
import Users from "./Users";

const SideBar = () => {
  const [show, setShow] = useState<string>("Default");
  const renderShow = (show: string) => {
    if (show === "Default") {
      return <Users />;
    } else if (show === "User") {
      return <p>List User</p>;
    } else if (show === "Group") {
      return <p>Group</p>;
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      {renderShow(show)}
      <div className="flex py-10">
        <button className="btn btn-outline" onClick={() => setShow("Default")}>
          All Users
        </button>
        <button className="btn btn-outline" onClick={() => setShow("User")}>
          All Conversations
        </button>
        <button className="btn btn-outline" onClick={() => setShow("Group")}>
          All Groups
        </button>
      </div>
      <LogOutButton />
    </div>
  );
};

export default SideBar;
