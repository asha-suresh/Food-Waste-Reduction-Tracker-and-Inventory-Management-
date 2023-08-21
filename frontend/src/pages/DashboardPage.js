import React, { useEffect, useState } from "react";
import './style.css'
import { Chart } from "react-google-charts";


const DashboardPage = ({ setActivePath }) => {


  useEffect(() => {
    setActivePath("Dashboard");
  }, []);


  

  const data = [
    ["Year", "Consumed or Donated", "Expired or Wasted"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];

  const options = {
    title: "Food waste Reduction",
    curveType: "function",
    legend: { position: "bottom" },
  };


  return (
    <div className="outlet-container">
      <div className="graphical-area">
        <div className="graph">
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={data}
          options={options}
        />


        </div>
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
