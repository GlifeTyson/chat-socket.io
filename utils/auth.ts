import JsCookie from "js-cookie";
import { domainOpts } from "./cookies";

interface State {
  "x-token": string | null;
}

const Auth = {
  constructor() {
    this.initialize();
  },
  state: {
    "x-token": null as string | null,
  },
  initialize() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("x-token") || JsCookie.get("x-token");
      this.state["x-token"] = token !== undefined ? token : null;
    }
  },
  set(token: string) {
    if (typeof window !== "undefined") {
      JsCookie.set("x-token", token, { expires: 365 });
      localStorage.setItem("x-token", token);
    }
    this.initialize();
    return true;
  },
  setAsyncToken(token: string) {
    if (typeof window !== "undefined") {
      JsCookie.set("x-token", token, { expires: 365, ...domainOpts() });
      localStorage.setItem("x-token", token);
    }
    this.initialize();
    return true;
  },
  check() {
    this.initialize();
    if (typeof window !== "undefined") {
      const token = this.state["x-token"];
      return token !== null && token !== "null";
    }
    return false;
  },
  login(token: string) {
    return this.set(token);
  },
  logout() {
    JsCookie.remove("x-token");
    localStorage.removeItem("x-token");
    const token = localStorage.getItem("x-token") || JsCookie.get("x-token");
    if (token) {
      return false;
    } else {
      this.state["x-token"] = null;
      return true;
    }
  },
};
export default Auth;
