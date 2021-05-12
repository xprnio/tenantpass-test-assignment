import { Dispatch, SetStateAction } from "react";

export interface AuthProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}
