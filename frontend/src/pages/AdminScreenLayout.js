import React, {useEffect, useState} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet,useNavigate } from "react-router-dom";
import DashboardPageHeader from "../components/Header/DashboardPageHeader";

const AdminScreenLayout = ({activePath}) => {
  const navigate = useNavigate();

  
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const userRole = localStorage.getItem("role");  

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (userRole !== "admin") {
      console.log("triggered");
      navigate("/");
    }
  }, [isLoggedIn, userRole, navigate]);
  
  return (
    <div className="main-layout">
      <Sidebar activePath={activePath} />
            <div className="main-component">
                  <DashboardPageHeader activePath={activePath} />
                  <Outlet />
            </div>
    </div>
  )
};


export default AdminScreenLayout