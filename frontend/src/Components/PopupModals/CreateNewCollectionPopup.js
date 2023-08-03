import React, { useState } from "react";
import './style.css'
import {FaPencilAlt, FaSave } from "react-icons/fa";
import PostRequest from '../../Service/PostRequest';




const CreateNewCollectionPopup = ({ isCollectionCreationModalOpen, onClose}) => {

    //for creating new collection
    const [collectionName,setCollectionName ]=useState("")

    const [inventoryid,setInventoryid ]=useState(localStorage.getItem("inventoryid"));


    const createNewCollection=()=>{
    PostRequest('http://localhost:8080/api/new/collection?inventory_id='+inventoryid, { collectionName: collectionName})
      .then(data => {
          console.log(data,"collection created successfully");
      });
    }


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
                <hr/>
                <div className="modal-content">
                                <button className="modal-close" onClick={onClose}>
                                &times;
                                </button>
                    
                    <div className="collection-edit-quick-info">
                        <div className="collection-edit-column1">
                            <div className="collection-name">
                                    <div className="collection-name-label">Name :</div>
                                    <input
                                            type="text"
                                            name="Collection Name"
                                            placeholder="Enter Collection Name"
                                            value={collectionName} onChange={(e)=>{setCollectionName(e.target.value)}} require
                                    ></input>
                            </div>
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