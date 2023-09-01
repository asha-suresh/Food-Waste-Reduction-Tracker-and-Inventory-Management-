import React , { useEffect, useState } from 'react'
import InventoryTableRows from './InventoryTableRows';
import GetRequest from '../../Service/GetRequest';

const InventoryTable = () => {

const [foodItems,setFoodItems]=useState([]);
const [activeFilter, setActiveFilter]= useState("all");


const userId = localStorage.getItem("userid");

  useEffect (()=>{
    fetchFoodItems("all");
  },[])


const fetchFoodItems= async (condition)=>{
  await GetRequest('view/all/foods?userId='+userId+'&tableFilter='+condition)
    .then(data => {
        setFoodItems(data)});
        setActiveFilter(condition);
  }
  
      return (
        <div className="table-with-header-options">
        <div className="table-header-options">
          <div className="table-name">Your Inventory</div>
          <div className="filter-options">
                <div className={`table-filter ${ activeFilter === "all" ? "active-filter" : ""}`} onClick={() => fetchFoodItems("all")}>All</div>
                <div className={`table-filter ${ activeFilter === "warning" ? "active-filter" : ""}`} onClick={() => fetchFoodItems("warning")}>Expring soon</div>
                <div className={`table-filter ${ activeFilter === "expired" ? "active-filter" : ""}`} onClick={() => fetchFoodItems("expired")}>Expired</div>
          </div>
        </div>
        <div className="table-container">
            <div className="table-header">
                <div className="table-column-title">Sl.no</div>
                <div className="table-column-title">Name</div>
                <div className="table-column-title">Category</div>
                <div className="table-column-title">Quantity</div>
                <div className="table-column-title">Items Left</div>
                <div className="table-column-title">Added on</div>
                <div className="table-column-title">Expires on</div>
                <div className="table-column-title">Status</div>
                <div className="table-column-title">Actions</div>
                <div className="table-column-title">Consume</div>


            </div>
            <div className="inventory-table-body-content">

            {foodItems === null || foodItems.length === 0 ? (
                          <div className="centralise-content">No Donation items to display.</div>
                        ) : (
            foodItems.map((item,index) => ( <InventoryTableRows key={item.id} slno={index + 1} {...item}/> )))}
            </div>
        </div></div>
      )
    }
  
    

export default InventoryTable