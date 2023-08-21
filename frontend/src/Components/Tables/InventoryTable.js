import React , { useEffect, useState } from 'react'
import InventoryTableRows from './InventoryTableRows';
import GetRequest from '../../Service/GetRequest';

const InventoryTable = () => {

const [foodItems,setFoodItems]=useState([]);

const userId = localStorage.getItem("userid");

  useEffect (()=>{
    fetchFoodItems();
  },[])


const fetchFoodItems= async ()=>{
  await GetRequest('view/all/foods?userId='+userId)
    .then(data => {
        setFoodItems(data)});
  }
  
    if (foodItems === null || foodItems.length === 0) {
        return <p>No Food items to display.</p>;
     }
     else {
      return (
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
            <div className="table-body-content">
    
            {foodItems.map((item,index) => ( <InventoryTableRows key={item.id} slno={index + 1} {...item}/> ))}
    
            </div>
        </div>
      )
    }
    }
    

export default InventoryTable