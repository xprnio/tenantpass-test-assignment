import { useEffect, useState } from "react";
import { UserType } from "../interfaces/users.interface";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<UserType>(Object);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);

    setCurrentUser(user);
  }, []);

  return currentUser;
}
