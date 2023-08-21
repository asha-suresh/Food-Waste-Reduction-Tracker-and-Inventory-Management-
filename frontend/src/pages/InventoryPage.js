import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import InventoryTable from "../components/Tables/InventoryTable";
import GetRequest from "../Service/GetRequest";

const InventoryPage = ({ setActivePath }) => {
  
  const userId = localStorage.getItem("userid");
  const inventoryId = localStorage.getItem("inventoryid");


   const [countOfTotalCollections, setCountOfTotalCollections] = useState();
   const [countOfFoods, setCountOfFoods] = useState();
   const [countOfTotalFoodItems, setCountOfTotalFoodItems] = useState();


    const [safeFoodCount, setSafeFoodCount] =useState();
    const [donatedCount, setDonatedCount] =useState();
    const [consumedCount, setConsumedCount] =useState();
    const [expiredCount, setExpiredCount] =useState();
    const [warningCount, setWarningCount] =useState();

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

        GetRequest("food/status/analytics?userId="+userId)
        .then(response=>{
            if(response){
              setSafeFoodCount(response.safeFoodCount)
              setConsumedCount(response.consumedCount)
              setDonatedCount(response.donatedCount)
              setExpiredCount(response.expiredCount)
              setWarningCount(response.warningCount)
            }
        })

        GetRequest("inventory/analytics?userId="+userId+"&inventory_id="+inventoryId)
        .then(response=>{
            if(response){
              setCountOfTotalCollections(response.countOfTotalCollections)
              setCountOfFoods(response.countOfFoods)
              setCountOfTotalFoodItems(response.countOfTotalFoodItems)
            }
        })
  }, []);
  
   const options = {
    title: "Food Categories",
  };

  return <div className="outlet-container">
    <div className="graphical-area">
          <div className="dashboard-info-row">
            <div className="Total-food-items-count"><span class="bold-text">{countOfTotalFoodItems}</span> Food Items</div>
            <br/>
            <div className="total-food-varieties-and-collections">
              <div className="total-food-varieties">
                <div className="text-count">{countOfTotalCollections}</div>
                <div className="text-info">Collections</div>
              </div>
              <div className="total-food-varieties">
                <div className="text-count">{countOfFoods}</div>
                <div className="text-info">Variety of Foods</div>
              </div>
            </div>
          </div>
          <div className="dashboard-info-row">
            <div className="food-status-quick-info-container">
              <h4>Food Items Status</h4><br/>
            <div className="area-flex"><div className="info-small-box green-box"></div> <div className="info-text">Safe to consume: <span class="bold-text">{safeFoodCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box"></div><div className="info-text">Donated: <span class="bold-text">{donatedCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box"></div><div className="info-text">Consumed: <span class="bold-text">{consumedCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box red-box"></div><div className="info-text">Expired: <span class="bold-text">{expiredCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box"></div><div className="info-text">Expiring soon: <span class="bold-text">{warningCount}</span></div></div>
            </div>
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
