import SideBar from "./components/SideBar";
import MessageContainer from "./components/MessageContainer";
import { useContext } from "react";
import { UserContext } from "@/context/UserProvider";
import { useRouter } from "next/router";

export default function Home() {
  const { me } = useContext(UserContext);

  return (
    <div className="p-4 w-full h-screen flex items-center justify-center">
      <div className="border-black border-[2px] flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <SideBar />
        <MessageContainer />
      </div>
    </div>
  );
}
