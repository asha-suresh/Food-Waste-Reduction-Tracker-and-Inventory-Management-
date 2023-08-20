import React, { useEffect, useState } from "react";
import './style.css'
import DonationsTable from "../components/Tables/DonationsTable";
import YourDonationsTable from "../components/Tables/YourDonationsTable";


const DonationsPage = ({ setActivePath }) => {

    useEffect(() => {
        setActivePath("Donations");
      }, []);

      
  return (
    <div className="outlet-container">
    <div className="graphical-area">
    <div className="dashboard-column-2">
          <div className="dashboard-info-row"></div>
          <div className="dashboard-info-row"></div>
        </div>
        <div className="graph">Your Donations History<YourDonationsTable/></div>
        
      </div>
      Donations History
      <div className="dashboard-table-section">
      <DonationsTable/>
      </div>
    </div>
  )
}

export default DonationsPage