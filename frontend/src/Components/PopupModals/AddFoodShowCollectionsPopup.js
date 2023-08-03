import React , { useEffect, useState } from 'react'
import './style.css'
import {FaPencilAlt, FaSave } from "react-icons/fa";
import GetRequest from '../../Service/GetRequest';
import CollectionsCardView from '../Cartcontainer/CollectionsCardView';




const AddFoodShowCollectionsPopup = ({ isAddNewFoodModalOpen, onClose}) => {

    //for creating new collection
    const [collectionName,setCollectionName ]=useState("")

    const[collectionsList,setcollectionsList]=useState([]);


    const [inventoryid,setInventoryid ]=useState(localStorage.getItem("inventoryid"));

    useEffect(() => {
      const inventoryid= localStorage.getItem("inventoryid");
      GetRequest("all/collections?inventory_id="+inventoryid)
          .then(response=>{
              if(response){
                setcollectionsList(response)
              }
          })
    }, []);


    const createNewCollection=()=>{
    PostRequest('http://localhost:8080/api/new/collection?inventory_id='+inventoryid, { collectionName: collectionName})
      .then(data => {
          console.log(data,"collection created successfully");
      });
    }


    if (!isAddNewFoodModalOpen) return null;
    return
    (
      <div className="modal-container">
         <div className="modal-area-edit-collection">
                    <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaPencilAlt /></div>
                        <div className="modal-heading-label">Add Food Item</div>
                       <div className="modal-header-sub-label"></div>
                    </div>
             </div>
                <hr/>
              <div className="modal-content">
                              <button className="modal-close" onClick={onClose}>
                                &times;
                              </button>
                <div>className="cards-container">Food Collection Carts
                      <CollectionsCardView/>
                      {collectionsList.map((collection)=><CollectionsCardView key={collection.id} {...collection}/>)}
                </div>
                 <br/>

                </div>
               <div className="modal-footer">
                 <div className="modal-footer-primary-action"onClick={createNewCollection}><FaSave/>Create</div>
                    <div className="modal-footer-close-btn" onClick={onClose}> &times; Cancel</div>
        </div>
        <div>
      <div>
    );
  };
 
export default AddFoodShowCollectionsPopup
