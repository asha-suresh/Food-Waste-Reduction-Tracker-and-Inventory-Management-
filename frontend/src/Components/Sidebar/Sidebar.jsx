import React , { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom";
import "./style.css";

const Sidebar = ({ activePath }) => {
  const navigate = useNavigate();

  const [isAddNewFoodModalOpen, setIsAddNewFoodModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsAddNewFoodModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddNewFoodModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  return (
    <div>

    <div className="sidebar">


          <div className="top_section" >
                   <h1 style={{display: "block", alignItems: "center"}} className="logo" >FWRT</h1>
                   <div style={{marginLeft: "150px"}} className="bars">
                   </div>
          </div>


      <div
        className={`sidebar-menu ${
          activePath === "Dashboard" ? "sidebar-menu-select" : ""
        }`}
        onClick={() => {
          navigate("/");
        }}
      >
        Dashboard
      </div>
      <div
        className={`sidebar-menu ${
          activePath === "Inventory" ? "sidebar-menu-select" : ""
        }`}
        onClick={() => {
          navigate("/inventory");
        }}
      >
        Inventory
      </div>
      <div
        className={`sidebar-menu ${
          activePath === "Collections" ? "sidebar-menu-select" : ""
        }`}
        onClick={() => {
          navigate("/cart");
        }}
      >
        Collections
      </div>
      <div
        className={`sidebar-menu ${
          activePath === "Donations" ? "sidebar-menu-select" : ""
        }`}
        onClick={() => {
          navigate("/donations");
        }}
      >
        Donations
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="sidebar-add-food-btn" onClick={() => {
                                            navigate("/add/food");
                                            }}>Add Food Item</div>
      <div className="sidebar-logout-btn" onClick={handleLogout}>Logout</div>

    </div>    </div>

  );
};

export default Sidebar;
