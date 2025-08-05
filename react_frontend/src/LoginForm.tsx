import React, { useState } from "react";
import "./LoginForm.css";

// PUBLIC_INTERFACE
export interface LoginFormProps {
  onLogin?: (credentials: { usernameOrEmail: string; password: string }) => void;
}

/**
 * LoginForm component renders a centered login form with username/email and password fields.
 * Performs client-side validation and displays errors for empty fields.
 */
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ usernameOrEmail: false, password: false });
  const [error, setError] = useState<string | null>(null);

  // PUBLIC_INTERFACE
  const validate = (): boolean => {
    if (!usernameOrEmail || !password) {
      setError("Both fields are required.");
      return false;
    }
    setError(null);
    return true;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ usernameOrEmail: true, password: true });
    if (validate() && onLogin) {
      onLogin({ usernameOrEmail, password });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" autoComplete="off" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Sign In</h2>
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input
            data-testid="usernameOrEmail"
            id="usernameOrEmail"
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, usernameOrEmail: true }))}
            className={touched.usernameOrEmail && !usernameOrEmail ? "invalid" : ""}
            placeholder="Enter your username or email"
            autoFocus
          />
          {touched.usernameOrEmail && !usernameOrEmail && (
            <div className="input-error">Username or Email is required.</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            data-testid="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            className={touched.password && !password ? "invalid" : ""}
            placeholder="Enter your password"
          />
          {touched.password && !password && (
            <div className="input-error">Password is required.</div>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
        <button data-testid="submit" className="login-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
