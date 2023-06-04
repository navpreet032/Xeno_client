import React, { useState } from "react";

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
 
  const navigateTo = useNavigate();
  
  

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
        axios.post('auth/register',{email,username,password});
      navigateTo("/login");

    }catch(err){
        console.log(err)
    }
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
        <input
          type="text"
          placeholder="username"
          className="loginInput"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          
        >
          SignUp
        </button>
      </form>
      <p>Already have account!</p>
      <Link to='/login'><p>Login</p></Link>
      
    </div>
  );
}