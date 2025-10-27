import React from "react";
import { FaUser, FaPlusCircle, FaBookmark, FaInfoCircle, FaCog } from "react-icons/fa";
// import {  FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Menu.css";


const Menu = () => {
  return (
    <div className="menu" >
      <ul>
        
        <Link to="/Profile"><li><FaUser className="menu-icon" /> Profile </li></Link>

       <Link to="/Newpost"><li><FaPlusCircle className="menu-icon" /> New Post </li></Link> 
        
        <Link to="/Saved"> <li><FaBookmark className="menu-icon" /> Saved </li></Link>
      
        <Link to="/Aboutpage"> <li>  <FaInfoCircle className="menu-icon" /> About</li></Link>
        
        {/* <Link to="/Profile"> <li>  <FaCog className="menu-icon" /> Settings</li></Link> */}
      
      </ul>
      
    </div>
  );
};

export default Menu;
