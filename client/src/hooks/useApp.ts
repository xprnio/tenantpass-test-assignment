import { useEffect, useState } from "react";

export default function useApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const now = new Date().getTime();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      setLoggedIn(true);
    }

    const parsedUser = JSON.parse(loggedInUser!);
    const expiration = new Date(parsedUser?.expiry).getTime();

    if (now > expiration) {
      localStorage.clear();
      setLoggedIn(false);
    }
  }, [now]);

  return { loggedIn, setLoggedIn };
}
