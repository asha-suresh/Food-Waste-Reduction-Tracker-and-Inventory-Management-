import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import InventoryTable from "../components/Tables/InventoryTable";
import GetRequest from "../Service/GetRequest";

const InventoryPage = ({ setActivePath }) => {
  
  const userId = localStorage.getItem("userid");

  const [data,setData] = useState([
    ["Food items", "Quantity"],
    ["Fruits", 0],
    ["Vegetables", 0],
    ["Canned Foods", 0],
    ["Juices", 0],
    ["Others", 0],
  ]);

  useEffect(() => {
    setActivePath("Inventory");
    //eslint-disable-next-line
    GetRequest("analytics/category?userId="+userId)
        .then(response=>{
            if(response){
              setData([
                ["Food items", "Quantity"],
                ["Fruits", response.fruits],
                ["Vegetables", response.vegetables],
                ["Canned Foods", response.cannedFoods],
                ["Juices", response.juices],
                ["Others", response.others],
              ])
            }
        })
  }, []);
  
   const options = {
    title: "Food Categories",
  };

  return <div className="outlet-container">
    <div className="graphical-area">
          <div className="dashboard-info-row">
          </div>
          <div className="dashboard-info-row">
          </div>
          <div className="dashboard-info-row">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"200px"}
          />
          </div>
    </div>

<div className="inventory-table-container">
    <InventoryTable/>
</div>
    
    </div>;
};

export default InventoryPage;
