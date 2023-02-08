import React from "react";
import logo from '../assets/logo.png';
import './Styling/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faPhone, faVideo, faPen, faContactBook, faSignOut } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className="side-bar">
        <a href="chat.html">
            <FontAwesomeIcon className="link-icon" icon={faComments} />
            Chat
        </a>
        <a href="Voicecall.html">
          <FontAwesomeIcon className="link-icon" icon={faPhone} />
          Voice
        </a>
        <a href="Videocall.html">
          <FontAwesomeIcon className="link-icon" icon={faVideo} />
          Video
        </a>
        <a href="Whiteboard.html">
          <FontAwesomeIcon className="link-icon" icon={faPen} />
          Whiteboard
        </a>
        <a href="Contacts.html">
          <FontAwesomeIcon className="link-icon" icon={faContactBook} />
          Contacts
        </a>
        <a href="Login.html">
          <FontAwesomeIcon className="link-icon" icon={faSignOut} />
          Sign Out
        </a>
</div>
  );
};

export default Sidebar;
