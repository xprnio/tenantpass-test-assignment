import useAuth from "./hooks/useAuth";
import { AuthProps } from "./interfaces/authProps.interface";

export default function Auth({ setLoggedIn }: AuthProps) {
  const {
    inputs,
    registrationState,
    setRegistrationState,
    handleChange,
    handleLogin,
    handleSignup,
  } = useAuth({ setLoggedIn });

  return (
    <form
      className="auth-form"
      onSubmit={!registrationState ? handleLogin : handleSignup}
    >
      <h1>TenChat</h1>

      <div className="auth-inputs">
        <input
          className="auth-input"
          type="text"
          name="username"
          placeholder="Username"
          value={inputs.username}
          onChange={handleChange}
        />
        {registrationState && (
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        )}

        <input className="auth-submit" type="submit" value="Join" />
      </div>

      <span
        role="button"
        onClick={() => setRegistrationState(!registrationState)}
      >
        {registrationState
          ? "Already an user? Log in"
          : "New to this? Create an account"}
      </span>
    </form>
  );
}
