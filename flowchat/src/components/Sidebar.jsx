import React from "react";
import logo from '../assets/logo.png';
import './Styling/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faPhone, faVideo, faPen, faContactBook, faSignOut, faHome } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className="side-bar">
         <a href="/">
            <FontAwesomeIcon className="link-icon" icon={faHome} />
            Home
        </a>
        <a href="/chat">
            <FontAwesomeIcon className="link-icon" icon={faComments} />
            Chat
        </a>
        <a href="/video">
          <FontAwesomeIcon className="link-icon" icon={faVideo} />
          Video
        </a>
        <a href="whiteboard">
          <FontAwesomeIcon className="link-icon" icon={faPen} />
          Whiteboard
        </a>
</div>
  );
};

export default Sidebar;
