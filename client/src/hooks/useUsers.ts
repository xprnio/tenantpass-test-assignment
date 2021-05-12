import { useEffect, useState } from "react";
import { User } from "../api";
import { UserType } from "../interfaces/users.interface";

export default function useUsers() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    User.getUsers()
      .then((data) => {
        setUsers(data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  return users;
}
