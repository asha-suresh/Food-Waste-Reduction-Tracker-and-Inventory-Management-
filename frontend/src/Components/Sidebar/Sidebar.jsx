import React , { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom";
import "./style.css";
import AddFoodShowCollectionsPopup from "../PopupModals/AddFoodShowCollectionsPopup";

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
    <div className="sidebar">

          <div className="top_section" >
                   <h1 style={{display: "block", alignItems: "center"}} className="logo" >FWRT</h1>
                   <div style={{marginLeft: "150px"}} className="bars">
                   </div>
          </div>


      <div
        className={`sidebar-menu ${
          activePath === "dashboard" ? "sidebar-menu-select" : ""
        }`}
        onClick={() => {
          navigate("/");
        }}
      >
        Dashboard
      </div>
      <div
        className={`sidebar-menu ${
          activePath === "inventory" ? "sidebar-menu-select" : ""
        }`}
        onClick={() => {
          navigate("/inventory");
        }}
      >
        Inventory
      </div>
      <div
        className={`sidebar-menu ${
          activePath === "cart" ? "sidebar-menu-select" : ""
        }`}
        onClick={() => {
          navigate("/cart");
        }}
      >
        Collections
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="sidebar-add-food-btn" onClick={handleOpenModal}>Add Food Item</div>

      <AddFoodShowCollectionsPopup isAddNewFoodModalOpen={isAddNewFoodModalOpen} onClose={handleCloseModal}/>

      <div className="sidebar-logout-btn" onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default Sidebar;
