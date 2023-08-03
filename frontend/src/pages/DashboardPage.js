import React, { useEffect, useState } from "react";
import './style.css'

const DashboardPage = ({ setActivePath }) => {

  useEffect(() => {
    setActivePath("dashboard");
  }, []);


  return (
    <div className="outlet-container">
      <div className="graphical-area">
        <div className="graph"></div>
        <div className="dashboard-column-2">
          <div className="dashboard-info-row"></div>
          <div className="dashboard-column-3">
              <div className="box"></div>
            < div className="box"></div>
          </div>
            
        </div>
      </div>
      <div className="dashboard-table-section"></div>
      
    </div>
  );
};

export default DashboardPage;
