import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const useToken = () => {
  const context = useContext(UserContext);

  if (!context) throw Error("useToken must be used inside UserContextProvider");

  return context;
};

export default useToken;
