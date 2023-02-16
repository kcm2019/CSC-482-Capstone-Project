import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { UserAuth } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const navigate = useNavigate();

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

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4 flex flex-col">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign Up Here!</h1>
        <p className="py-2">
          Have an account?{" "}
          <Link to="/" className="underline">
            Sign In
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center self-center content-start">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-10 w-96"
            type="password"
            placeholder="Password"
          />
          <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10 h-10"/>
        </div>
      </form>
    </div>
  );
};

export default Register;
