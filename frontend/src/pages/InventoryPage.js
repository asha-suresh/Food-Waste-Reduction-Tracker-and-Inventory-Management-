import React, { useEffect, useState } from "react";
import InventoryTable from "../components/Tables/InventoryTable";
import GetRequest from "../Service/GetRequest";
import InventoryPageQuickSearch from "../components/analyticsCards/InventoryPageQuickSearch";

const InventoryPage = ({ setActivePath }) => {
  
  const userId = localStorage.getItem("userid");
  const inventoryId = localStorage.getItem("inventoryid");


   const [countOfTotalCollections, setCountOfTotalCollections] = useState();
   const [countOfFoods, setCountOfFoods] = useState();
   const [countOfTotalFoodItems, setCountOfTotalFoodItems] = useState();
   

  useEffect(() => {
    setActivePath("Inventory");
        GetRequest("inventory/analytics?userId="+userId+"&inventory_id="+inventoryId)
        .then(response=>{
            if(response){
              setCountOfTotalCollections(response.countOfTotalCollections)
              setCountOfFoods(response.countOfFoods)
              setCountOfTotalFoodItems(response.countOfTotalFoodItems)
            }
        })
  }, []);
  
 
  return <div className="outlet-container">
    <div className="graphical-area">
          <div className="dashboard-info-row-fixed-size">
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
          <InventoryPageQuickSearch/>
    </div>

<div className="inventory-table-container">
    <InventoryTable/>
</div>
    
    </div>;
};

export default InventoryPage;
