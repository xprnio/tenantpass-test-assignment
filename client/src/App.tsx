import "./styles/App.css";
import Auth from "./Auth";
import Chat from "./Chat";
import useApp from "./hooks/useApp";

export default function App() {
  const { loggedIn, setLoggedIn } = useApp();

  return (
    <div className={!loggedIn ? "app" : "chat"}>
      {!loggedIn ? (
        <Auth setLoggedIn={setLoggedIn} />
      ) : (
        <Chat setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}
