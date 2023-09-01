import React, { useEffect, useState } from "react";
import './style.css'
import { Chart } from "react-google-charts";
import FoodItemStatusAnalyticsCard from "../components/analyticsCards/FoodItemStatusAnalyticsCard";
import DashbaordPieChartAnalyticsCard from "../components/analyticsCards/DashbaordPieChartAnalyticsCard";
import GetRequest from "../Service/GetRequest";


const DashboardPage = ({ setActivePath }) => {


  useEffect(() => {
    setActivePath("Dashboard");
    fetchGraphData();
  }, []);

  const [graphData,setGraphData] = useState([]);

  const options = {
    title: "Food waste Reduction",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const fetchGraphData = () =>{
    const userId = localStorage.getItem("userid");
    GetRequest("get/food/consumption/monthly/analytics?userId="+userId)
           .then(response=>{
               if(response){
                  // Formatting the data for visualization
                  const formattedData = response.map(item => [
                    item.month,
                    item.donatedFoodCount,
                    item.expiredFoodCount
                  ]);
                  // Adding header row
                  formattedData.unshift(['Month', 'Consumed/Donated Food', 'Expired/Wasted Food']);
                  setGraphData(formattedData);
               }
           })
  }


  return (
    <div className="outlet-container">
      <div className="graphical-area">
        <div className="graph">
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={graphData}
          options={options}
        />
        </div>  

        
        <div className="dashboard-column-2">
          <div className="dashboard-info-row"><FoodItemStatusAnalyticsCard/></div>
          <div className="box-big"><DashbaordPieChartAnalyticsCard/></div>
        </div>
      </div>
      <div className="dashboard-table-section"></div>
      
    </div>
  );
};

export default DashboardPage;
