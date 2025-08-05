import React, { useState } from "react";
import "./LoginForm.css";

// PUBLIC_INTERFACE
export interface LoginFormProps {
  onLogin?: (credentials: { usernameOrEmail: string; password: string }) => void;
}

/**
 * LoginForm component renders a centered login form with username/email and password fields.
 * Performs client-side validation and displays errors for empty fields.
 * For demonstration, checks credentials against mock values and displays a message.
 */
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  // State
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ usernameOrEmail: false, password: false });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Hardcoded mock credentials
  const MOCK_USERNAME = "testuser";
  const MOCK_PASSWORD = "testpass";

  // PUBLIC_INTERFACE
  const validate = (): boolean => {
    if (!usernameOrEmail || !password) {
      setError("Both fields are required.");
      setSuccess(false);
      return false;
    }
    setError(null);
    return true;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ usernameOrEmail: true, password: true });
    if (!validate()) {
      setSuccess(false);
      return;
    }

    // Check credentials against mock data
    if (
      usernameOrEmail === MOCK_USERNAME &&
      password === MOCK_PASSWORD
    ) {
      setError(null);
      setSuccess(true);
    } else {
      setError("Invalid username or password.");
      setSuccess(false);
    }

    // Call parent login handler if provided, for demonstration use
    if (onLogin) {
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
        {success && <div className="error-message" style={{ color: '#24aa4a' }}>Login successful!</div>}
        <button data-testid="submit" className="login-button" type="submit">
          Log In
        </button>
        <div style={{ fontSize: "0.85em", color: "#666", marginTop: "10px", textAlign: "center" }}>
          <span>
            <strong>Mock credentials:</strong> <br />
            Username: <code>testuser</code>
            {" | "}
            Password: <code>testpass</code>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
