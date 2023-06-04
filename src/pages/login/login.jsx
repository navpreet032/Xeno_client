import React, { useContext, useState } from "react";
import { login } from "../../context/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigateTo =useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    if(user)navigateTo('/');
  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
      <Link to='/rege'><p>New User?</p></Link>
    </div>
  );
}