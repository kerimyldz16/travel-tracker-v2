import React, { useState, useContext } from "react";
import { AppContext } from "../context/appContext.js";
import { register } from "../utils/authService.js";
import { Link } from "react-router-dom";

const Register = () => {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await register(email, password);
      setUser(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register">
      <h2 className="auth-h2">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="register-link">
        <p>
          Do you have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
