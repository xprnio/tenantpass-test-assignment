import useCurrentUser from "./hooks/useCurrentUser";
import useMessaging from "./hooks/useMessaging";
import { AuthProps } from "./interfaces/authProps.interface";
import { UserIcon, SendIcon } from "./svg";

export default function Chat({ setLoggedIn }: AuthProps) {
  const currentUser = useCurrentUser();
  const { text, setText, sendMessage, messages } = useMessaging();

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <div className="chat">
      <nav>
        <h2>TenChat</h2>
        <span role="button" onClick={() => handleLogOut()}>
          Logout
        </span>
      </nav>

      <section className="messages">
        {messages?.map((message) => {
          return (
            <span className="single-message" key={message.id}>
              <span role="img" className="avatar">
                <UserIcon
                  fill={currentUser?.color ? `#${currentUser?.color}` : "#fff"}
                />
              </span>
              <div>
                <span className="username">{message.name}</span>
                <p className="message-content">{message.text}</p>
              </div>
            </span>
          );
        })}
      </section>

      <form className="message-form">
        <input
          type="text"
          className="message"
          placeholder="Send message"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          type="button"
          className="submit-message"
          onClick={() => sendMessage()}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
