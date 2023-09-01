import React from 'react'

import { useNavigate } from "react-router-dom";
import "./style.css";
import { FaEye, FaPenAlt, FaPenNib, FaPencilAlt } from 'react-icons/fa';

const Sidebar = ({ activePath }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("role");


  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  return (
    <div>
    <div className="sidebar">

          <div className="top_section" >
                   <h4 style={{display: "block", alignItems: "center"}} className="logo" >FWRT</h4>
          </div>


          <div class="user-data-centered">
              <div className="profile-icon"></div>
              {userRole === "user" ? (<div className="user-profile-data-with-actions">
                <div className='user-data-centralised-text'>{username}</div>
                <div className="user-profile-view-btn" onClick={()=>{navigate('/profile')}}><FaEye/></div>
              </div>):(<div className='centralise-admin-banner'>Admin</div>)}
         </div>

         {userRole !== "admin" ? (
<div>
      <div className={`sidebar-menu ${activePath === "Dashboard" ? "sidebar-menu-select" : ""}`} onClick={() => { navigate("/");}}>
          Dashboard
      </div>
      <div className={`sidebar-menu ${activePath === "Inventory" ? "sidebar-menu-select" : ""}`} onClick={() => {navigate("/inventory");}}>
          Inventory
      </div>
      <div
        className={`sidebar-menu ${activePath === "Collections" ? "sidebar-menu-select" : ""}`} onClick={() => { navigate("/cart");}}>
          Collections
      </div>
      <div className={`sidebar-menu ${activePath === "Donations" ? "sidebar-menu-select" : ""}`} onClick={() => { navigate("/donations");}}>
          Donations
      </div>
      <div className={`sidebar-menu ${activePath === "Notifications" ? "sidebar-menu-select" : ""}`} onClick={() => { navigate("/notifications");}}>
          Notifications
      </div>

      
      <br/>
      <br/>
      <br/>
      <div className="sidebar-footer-container">
          <div className="sidebar-add-food-btn" onClick={() => { navigate("/add/food");}}>Add Food Item</div>   
          <div className="sidebar-logout-btn" onClick={handleLogout}>Logout</div>
          <div className="small-footer-text">Food Mangement & Food waste Reduction Tracker</div>
      </div>

    </div>  ):
        <div className={`sidebar-menu ${activePath === "Admin" ? "sidebar-menu-select" : ""}`} onClick={() => { navigate("/admin");}}>
              Admin Dashboard
          </div>
    }  </div>  
    </div>
  );
};

export default Sidebar;
