import React, {useState, useEffect} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet,useNavigate } from "react-router-dom";
import DashboardPageHeader from "../components/Header/DashboardPageHeader";


const MainLayout = ({activePath}) => {
  const navigate = useNavigate();

  
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );



  function isloggedin(){
    if (!isLoggedIn){
      console.log(isLoggedIn);
      navigate("/login");
    }
  }
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    isloggedin();
  }, []);


  
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

export default MainLayout;
