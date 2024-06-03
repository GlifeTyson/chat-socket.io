import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider, { UserContext } from "../context/UserProvider";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/context/SocketProvider";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(), // for in-memory caching
  credentials: "include", // for cookies sending per request
});
export default function App({ Component, pageProps }: AppProps) {
  // const router = useRouter();

  // useEffect(() => {
  //   if (!me && (router.pathname === "/" || router.pathname === "/signup")) {
  //     router.push("/login");
  //   } else {
  //     console.log("me from home page", me);
  //   }
  // }, [me, router]);

  return (
    <UserProvider>
      <SocketProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <Toaster />
        </ApolloProvider>
      </SocketProvider>
    </UserProvider>
  );
}
