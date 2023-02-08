import React from "react";
import logo from '../assets/logo.png';
import './Styling/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar/>
      <div className="main-content">
        <div className="content-container">
          <h1>Welcome to FlowChat</h1>
          <img src={logo} alt="Logo" className="logo" />
          <h3 className="welcome-message">Easily message, call, and design with friends and colleagues!</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
