import { createContext } from "react";
import type { CartContextProps } from "../types/CartContextProps";

export const CartContext = createContext<CartContextProps | undefined>(undefined);