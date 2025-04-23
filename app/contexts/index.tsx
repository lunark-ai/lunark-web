import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { AppKitContext } from "./AppKitContext";
import { UserContext } from "./UserContext";
import { PaymentContext } from "./PaymentContext";
import { SocketContext } from "./SocketContext";

export const useGlobalContext = () => useContext(GlobalContext);
export const useAppKitContext = () => useContext(AppKitContext);
export const useUserContext = () => useContext(UserContext);
export const usePaymentContext = () => useContext(PaymentContext);
export const useSocketContext = () => useContext(SocketContext);