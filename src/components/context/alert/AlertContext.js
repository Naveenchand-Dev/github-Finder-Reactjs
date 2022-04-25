import { createContext, useReducer } from "react";
import AlertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispath] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type) => {
    dispath({ type: "SET_ALERT", payload: { msg, type } });

    setTimeout(() => dispath({ type: "REMOVE_ALERT" }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
