import React, { useState, useEffect } from "react";
import './style.css'
import {FaPencilAlt, FaSave } from "react-icons/fa";
import PostRequest from '../../Service/PostRequest';
import AddFoodPopup from "./AddFoodPopup";




const CreateNewCollectionPopup = ({ isCollectionCreationModalOpen, onClose }) => {

    //for creating new collection
    const [collectionName,setCollectionName ]=useState("")

    const [inventoryid,setInventoryid ]=useState(localStorage.getItem("inventoryid"));
    const [collectionId,setCollectionid ]=useState();


    const [isAddNewFoodModalOpen, setIsAddNewFoodModalOpen] = useState(false);


     const handleAddFoodPopupModalOpen = () => {
       setIsAddNewFoodModalOpen(true);

     };
 
     const handleAddFoodsPopupCloseModal = () => {
       setIsAddNewFoodModalOpen(false);
       onClose();
     };


    const createNewCollection=()=>{
    PostRequest('http://localhost:8080/api/new/collection?inventory_id='+inventoryid, { collectionName: collectionName})
      .then(data => {
        setCollectionid(data);
          console.log(data,"collection created successfully");
          handleAddFoodPopupModalOpen();
               });
    }

    useEffect(()=>{},[isAddNewFoodModalOpen]);


    if (!isCollectionCreationModalOpen) return null;

    return (
      <div className="modal-container">
        <div className="modal-area modal-area-edit-collection">
                <div className="modal-header">
                    <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaPencilAlt /></div>
                        <div className="modal-heading-label">Create new collection</div>
                        <div className="modal-header-sub-label"></div>
                    </div>
                </div>
                <AddFoodPopup isAddNewFoodModalOpen={isAddNewFoodModalOpen} onAddFoodPopupClose={handleAddFoodsPopupCloseModal} collectionId={collectionId}/>

                <hr/>
                <div className="modal-content">
                                <button className="modal-close" onClick={onClose}>
                                &times;
                                </button>
                    
                    <div className="collection-edit-quick-info">
                            <div className="collection-name">
                                    Collection Name:<input
                                            type="text"
                                            name="Collection Name"
                                            placeholder="Enter Collection Name"
                                            className="custom-input"
                                            value={collectionName} onChange={(e)=>{setCollectionName(e.target.value)}} require
                                    ></input>
                            </div>
                    </div>

                    <br/>

                </div>
                <div className="modal-footer">
                    <div className="modal-footer-primary-action"onClick={createNewCollection}><FaSave/>Create</div>
                    <div className="modal-footer-close-btn" onClick={onClose}> &times; Cancel</div>
                </div>
        </div>
      </div>
    );
  };

export default CreateNewCollectionPopup