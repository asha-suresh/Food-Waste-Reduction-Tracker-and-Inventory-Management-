import React, { useEffect } from "react";

const InventoryPage = ({ setActivePath }) => {
  useEffect(() => {
    setActivePath("inventory");
    //eslint-disable-next-line
  }, []);

  return <div className="outlet-container">
    <div className="graphical-area">
          <div className="dashboard-info-row">
          </div>
          <div className="dashboard-info-row">
          </div>
          <div className="dashboard-info-row">
          </div>
    </div>
    
    Inventory</div>;
};

export default InventoryPage;
