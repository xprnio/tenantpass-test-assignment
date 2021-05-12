import { useState, FormEvent } from "react";
import { User } from "../api";
import { AuthProps } from "../interfaces/authProps.interface";
import useUsers from "./useUsers";

export default function useAuth({ setLoggedIn }: AuthProps) {
  const [registrationState, setRegistrationState] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    name: "",
  });

  const users = useUsers();

  const logIn = () => {
    const currentUser = users?.find(
      (user) => user.username === inputs.username
    );

    const localStorageItem = {
      username: inputs.username,
      name: currentUser?.name,
      ...(currentUser?.color && { color: currentUser?.color }),
      expiry: new Date(new Date().setHours(new Date().getHours() + 1)),
    };

    localStorage.setItem("user", JSON.stringify(localStorageItem));

    setLoggedIn(true);
  };

  const handleChange = (event: FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    setInputs({
      ...inputs,
      [target.name]: target.value,
    });
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (users?.some((user) => user.username === inputs.username)) {
      logIn();
    } else {
      setRegistrationState(true);
    }
  };

  const handleSignup = (event: FormEvent) => {
    event.preventDefault();

    User.createUser(inputs)
      .then(() => {
        logIn();
      })
      .catch((err) => console.log(err));
  };

  return {
    inputs,
    registrationState,
    setRegistrationState,
    handleChange,
    handleLogin,
    handleSignup,
  };
}
