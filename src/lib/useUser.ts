import { useContext } from "react";
import { UserContext } from "@/component/UserContext";

export const useUser = () => {
  return useContext(UserContext).user;
};

