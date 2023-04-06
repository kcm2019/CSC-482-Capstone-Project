import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Styling/Login.css';
import { UserAuth } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar";
import logo from '../assets/logo.png';

const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <img src={ logo } alt="Logo" class="logo"></img>
      <h1>FlowChat</h1>
      <h2>Login</h2> <br/>
      <div className="flex flex-col justify-center items-center self-center content-start">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center self-center content-start w-96">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-10"
              type="password"
              placeholder="Password"
            />
            <input type="submit" className="bg-black hover:bg-white text-white hover:text-black cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10 h-10"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
